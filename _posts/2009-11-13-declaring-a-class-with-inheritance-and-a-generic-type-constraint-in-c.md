---
title: Declaring a class with inheritance and a generic type constraint in C#
layout: post
date: 2009-11-13
type: regular
---

I’m writing a generic class that inherits from a base class, implements an interface, and has a type constraint on the generic class. The class inheritance and interface are straightforward, as is the type constraint, but combined together it’s not obvious how to write this. Any examples of type constraints I could find don’t have inheritance or interfaces as well. So, via a bit of trail and error, here is a right way to declare such a class:

	public class MyClass<T> :
	    BaseClass<T>, IMyInterface
	    where T : ClassOfT
	{...}
