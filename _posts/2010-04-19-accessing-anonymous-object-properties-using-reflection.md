---
title: Accessing anonymous object properties using reflection
layout: default
tags:
  - c-sharp
  - reflection

type: regular
---

Anonymous objects are a way to create strongly typed objects without having to declare a class or struct in C# 3.5 and above. Declaring an anonymous object is easy:

	var breakfast = new
	{
	    Cereal = "High fibre",
	    Coffee = "Latte",
	    Bacon = "Crispy"
	};

In the scope of the object’s declaration, accessing the properties of breakfast is as simple as `breakfast.Cereal`. However accessing the properties outside of that scope is not as simple. Say we have an object `ben` with a method `Eat(object meal)`. Within `ben.Eat()` we can’t do something directly with `meal.Coffee` because `Coffee` isn’t known in `ben.Eat()`‘s scope.

Getting a property value using reflection is pretty basic but takes a couple of steps. There are much more advanced uses of reflection that allow access to hidden properties, fields and methods, but picking public properties is probably the easiest case. The following method returns the value of a public property of an object. This could be used on an anonymous object, or on any other class of object.

	using System.Reflection;
	...
	object GetPropertyValue(object o, string propertyName)
	{
	    var prop = o.GetType().GetProperty(propertyName);
	    if (prop == null) return null;
	    return prop.GetValue(o, null);
	}
	...
	var cereal = GetPropertyValue(breakfast, "Cereal");
	Assert.That(cereal, Is.EqualTo("High fibre"));

prop is a PropertyInfo object that lets the value of a property be retrieved via reflection. The same method can be used to get a dictionary of [property name, value] from an anonymous object:

	IDictionary<string, object> ObjectToDictionary(object o)
	{
	    var dict = o.GetType().GetProperties().ToDictionary(
	        prop => prop.Name, prop => prop.GetValue(o, null)
	            );
	    return dict;
	}

This sets up a dictionary where the key is the name of the property, and the value is (ahem) the value of the property:

	var breakfastDictionary = ObjectToDictionary(breakfast);
	Assert.That(breakfastDictionary.Count, Is.EqualTo(3));
	Assert.That(breakfastDictionary["Coffee"], Is.EqualTo("Latte"));

Using anonymous objects and reflection is a bit slower to execute than using strongly-typed objects, but once the methods are in place to access the properties, the savings in developer time can be great. Leaving more time for breakfast. Speaking of which, I’m late for work.

