---
layout: post
title: AppDomains with a MEF plugin environment
comments: true
date: 2012-04-29
---

*The source code for the example application created while writing this post is available on [GitHub](https://github.com/belfryimages/mef-test).*

My [last post](http://blog.belfryimages.com.au/setting-up-mef.html) stepped through setting up a simple application with support for plugins loaded using MEF. This post will add support for AppDomains.

Using AppDomains wrap each plugin in its own sandbox, using .NET Remoting to allow in-process communication between the various components. This should solve issues like incompatible versioning in dependencies and plugins being able to crash the host application.

## Setting up

First I made sure that my consuming application was definitely going to be able to find my plugins. Previously, although MEF was loading `Plugins.dll` by name, I had lazily referenced the `Plugins` assembly to get the copy happening. To copy the plugin dll without the reference, I added the following to the end of the `Plugin` project file:

	<Target Name="AfterBuild">
		<Copy SourceFiles="$(OutputPath)\Plugins.dll" DestinationFolder="..\Consumer\$(OutputPath)"/>
	</Target>

Then I changed the catalog initialisation code to reference `Plugins.dll` by name, as a string:

    catalog.Catalogs.Add(new AssemblyCatalog("Plugins.dll"));

## Extract the composition logic

Originally I set up the MEF container inside the application's constructor. To extract that I created a new helper class:

	public class PluginComposer
	{
		CompositionContainer _container;

		public PluginComposer()
		{
			var catalog = new AggregateCatalog();
			catalog.Catalogs.Add(new AssemblyCatalog(System.Reflection.Assembly.GetExecutingAssembly()));
			catalog.Catalogs.Add(new AssemblyCatalog("Plugins.dll"));
			
			_container = new CompositionContainer(catalog);
		}

		public void Compose(object o)
		{
			_container.ComposeParts(o);
		}
	}

Then changed the application constructor to use this helper:

		public Form1()
		{
			InitializeComponent();

			var pluginComposer = new PluginComposer();
			pluginComposer.Compose(this);
		}

`PluginComposer` can be wrapped in another helper class, which will look after the secondary AppDomain. `PluginComposer`'s composer will need to inherit `MarshallByRefObject`, this adds some remoting magic to the object to communicate through the AppDomains:

	public class PluginComposer : MarshalByRefObject
	...

Then the `SafePluginComposer` class creates a secondary AppDomain, and creates an instance to a `PluginComposer` within that AppDomain and gets a reference to the instance in the one operation:

	public class SafePluginComposer
	{
		AppDomain _pluginAppDomain;
		PluginComposer _composer;

		public SafePluginComposer()
		{
			_pluginAppDomain = AppDomain.CreateDomain(
				"ConsumerPlugins_" + Guid.NewGuid().ToString(),
				new System.Security.Policy.Evidence(AppDomain.CurrentDomain.Evidence),
				AppDomain.CurrentDomain.BaseDirectory,
				AppDomain.CurrentDomain.BaseDirectory,
				true);
			_composer = (PluginComposer)_pluginAppDomain.CreateInstanceAndUnwrap(
				typeof(PluginComposer).Assembly.GetName().FullName,
				typeof(PluginComposer).FullName);
		}

		public void Compose(object o)
		{
			_composer.Compose(o);
		}
	}

`SafePluginComposer._composer` exists in the secondary AppDomain, and communicates with the application's AppDomain using .NET Remoting.

## Marshal all the things

If I just swap the application's plugin composer with `SafePluginComposer` I start getting exceptions telling me to mark my plugin classes as serializable. Fair enough, they need to be serialised to pass through remoting. While just adding `[Serializable]` to each plugin class definition sounds right, this isn't enough.

> If the object is marked as **Serializable**, the object will automatically be serialized, transported from the one application domain to the other, and then deserialized to produce an exact copy of the object in the second application domain. This process is typically referred to as marshal by value.
>
> <cite><a href="http://msdn.microsoft.com/en-us/library/ms973893.aspx#objserializ_topic3">Object Serialization in the .NET Framework</a></cite>

So if I just used `[Serializable]`, the plugin is copied into the original application domain. If the plugin inherits from `MarshalByRefObject`, we end up with a reference to the object running in the plugin application domain:

	public class BasicHelloWorldPlugin : MarshalByRefObject, IHelloWorldPlugin
	...

The application class and any other consuming classes also have to be marked with `Serializable`, and the plugin enumerations have to be made public so they can be seen by the serialiser:

		[ImportMany]
		public IEnumerable<IHelloWorldPlugin> HelloWorldPlugins { get; private set; }
		[ImportMany]
		public IEnumerable<IGoodbyeCruelWorldPlugin> GoodbyeCruelWorldPlugins { get; private set; }
		
		

## Is this worth my while?

I honestly have no idea. If a plugin throws an exception it will still crash the application, it just gets serialised first. So the application still has to handle exceptions from plugins. This just protects the application and the user from other ways of breaking.

