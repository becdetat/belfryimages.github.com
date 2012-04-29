---
layout: post
title: Setting up MEF
comments: true
date: 2012-04-29
---

*The source code for the example application created while writing this post is available on [GitHub](https://github.com/belfryimages/mef-test).*

I've been working on adding support for plugins to [MarkPad](http://code52.org/DownmarkerWPF/). Initially this was going to use NuGet to drag in the plugins, and MEF to dynamically load the . Because of problems like how to manage updates with new versions and the general awkwardness of the build system, I've decided to drop NuGet for now and just link the plugins statically, still using MEF to handle basic dependency injection and loading up the plugins.

MEF seems tragically difficult to debug, especially when setting it up in an existing application like MarkPad, with Autofac already set up and doing magic, so I've set up a test application to get a feel of the general layout. This is a bit of a walkthrough of the result.

## Projects / assemblies

There are three assemblies in my test application:

- **Consumer**, a WinForms app that will consume the exported extensions,
- **Contracts**, a class library containing interfaces that the plugins and consumer will operate through (essentially the plugin API), and
- **Plugins**, another class library containing the plugin classes

Both the **Consumer** and **Plugins** assemblies reference the **Contracts** assembly. In a real-world application, each plugin would reside in its own assembly and would be loaded from an `Extensions` folder or similar, but in this example I'll just make the **Consumer** assembly reference the **Plugins** assembly. This is just to get the **Plugins** dll into the output directory, as later on MEF just imports **Plugins.dll** by name anyway. I could probably drop the reference and copy **Plugins.dll** to the output directory in the build, but what I've got is a bit simpler in the short term.

## Spec for the example

### The application
The application will consist of just two buttons and a text box. The first button will call all of the **HelloWorld** plugins, and the second will call all of the **GoodbyeCruelWorld** plugins. The value of the text box (labeled 'Name') will be made available to the plugins.

**HelloWorld** plugins will implement `IHelloWorldPlugin`, **GoodbyeCruelWorld** plugins will implement `IGoodbyeCruelWorldPlugin`, and the application will implement `IGetName` to expose the entered name.

I've got both **HelloWorld** and **GoodbyeCruelWorld** plugins to demonstrate different plugins providing different functionality to the consuming application, while using the same API.

### Plugins
I'm going to have three plugins:

- A `IHelloWorldPlugin` plugin that replies with a `Hello, World!` message when called,
- A `IHelloWorldPlugin` plugin that takes a `IGetName` dependency that provides a name from the consuming application, and replies with a `Hello, {{name}}!` message when called, and
- A `IGoodbyeCruelWorldPlugin` that replies with its own message when called

## Initial setup
I won't write the MEF decorators or management code yet, instead I'll get the implementation code out of the way.

### Contracts

The contracts / plugin API is very simple. I want a base plugin type (`IPlugin`), two plugin types (`IHelloWorldPlugin` and `IGoodbyeCruelWorldPlugin`) and a way to expose what is in the 'name' text box (`IGetName`).

	public interface IPlugin { }
	
	public interface IHelloWorldPlugin : IPlugin
	{
		string GetHelloMessage();
	}

	public interface IGoodbyeCruelWorldPlugin
	{
		string GetGoodbyeMessage();
	}
	
	public interface IGetName
	{
		string GetName();
	}

### Plugins

The actual implementation of the plugins is also very simple.

	public class BasicHelloWorldPlugin : IHelloWorldPlugin
	{
		public string GetHelloMessage() { return "Hello, world!"; }
	}

	public class HelloNamePlugin : IHelloWorldPlugin
	{
		IGetName _getName;
		public string GetHelloMessage() { return string.Format("Hello, {0}!", _getName.Name); }
	}

	public class GoodbyeCruelWorldPlugin : IGoodbyeCruelWorldPlugin
	{
		public string GetGoodbyeMessage() { return "Noooooooo!!!!"; }
	}

The `IGetName _getName` instance will be injected by MEF, I'll add the decorator later on.

### Consumer

First I'll just sketch out how I want the consuming code to see and execute the plugins.

The application in the  **Consumer** assembly needs to implement `IGetName`. There are other ways of doing this but this is rather straightforward. More complex examples might need to use singletons or have a bootstrap procedure that allows the plugin to connect to the consumer.

	public partial class Form1 : Form, IGetName
	{
		...
		public string GetName() { return GetNameTextBox.Text; }
	}	

The plugins are injected into two sets of collections. MEF uses the exported interface to import the implementation into the correct places, so these will get the correct plugins assigned. Then the plugins are called in the appropriate places.

	IEnumerable<IHelloWorldPlugin> _helloWorldPlugins;
	IEnumerable<IGoodbyeCruelWorldPlugin> _goodbyeCruelWorldPlugins;
	
	private void HelloWorld_Click(object sender, EventArgs e)
	{
		foreach (var plugin in _helloWorldPlugins)
		{
			MessageBox.Show(plugin.GetHelloWorldMessage());
		}
	}

	private void GoodbyeCruelWorld_Click(object sender, EventArgs e)
	{
		foreach (var plugin in _goodbyeCruelWorldPlugins)
		{
			MessageBox.Show(plugin.GetGoodbyeMessage());
		}
	}

## Hooking up MEF

### Decorating the contract interfaces and importing fields

All the assemblies need to reference `System.ComponentModel.Composition`. As an aside, have you installed the [`PowerCommands`](http://visualstudiogallery.msdn.microsoft.com/e5f41ad9-4edc-4912-bca3-91147db95b99/) extension for Visual Studio 2010? It lets you copy and paste project references within the Solution Explorer. Groovy.

All the contract endpoints (the interfaces that will be imported using MEF) need to have the `InheritedExport` attribute added to the interface. In this example, that is all of the interfaces in **Contracts**. Here is what `IHelloWorldPlugin` should look like with the `InheritedExport` attribute:

	[InheritedExport]
	public interface IHelloWorldPlugin : IPlugin
	{
		string GetHelloMessage();
	}

Any fields that need to  be imported by MEF also need to be decorated. The `_getName` field in `HelloNamePlugin` should look like this:

	[Import]
	IGetName _getName;

And the consumer's plugin collections and should look like this:

	[ImportMany]
	IEnumerable<IHelloWorldPlugin> _helloWorldPlugins;
	[ImportMany]
	IEnumerable<IGoodbyeCruelWorldPlugin> _goodbyeCruelWorldPlugins;

If you run the application at this point, it  will crash and burn because the consumer's fields are all still `null`. We still need to configure MEF and get it to compose the parts of the application.

### MEF configuration

The following goes in the consuming application's constructor, after `InitializeComponent()` since this is a WinForms app:

	var catalog = new AggregateCatalog();
	catalog.Catalogs.Add(new AssemblyCatalog("Plugins.dll"));
	var container = new CompositionContainer(catalog);
	container.ComposeParts(this);

This creates an aggregate catalog, which brings together all the locations (catalogs) where the exported implementations are found. In this case it is just `Plugins.dll`. There are a couple of other `XxxCatalog` implementations that can be used, for more information the [catalogs page](http://mef.codeplex.com/wikipage?title=Using%20Catalogs&referringTitle=Guide) in the [MEF documentation](http://mef.codeplex.com/documentation) touches on them.

The catalog is then used to create a composition container. Each class in the consumer that needs to import classes using MEF will need this catalog, so in more complex applications the composition container will need to be passed around. The `ComposeParts()` method call is what performs the actual dependency injection, finding all the fields decorated with `[Import]` and `[ImportMany]` and assigning them with the exported implementations that were foundin the aggregate catalog.

## Shake your groove thang

With everything wired up and MEF properly configured, pressing the 'Say Hello' button should show `'Hello, World'` and `'Hello, <whatever is in the name text box>' `. Pressing the 'Say Goodbye' button should just show a pitiful cry of despair.

In case you missed it at the top, the entire project is on [GitHub](https://github.com/belfryimages/mef-test).



























    




