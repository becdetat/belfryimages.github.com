---
title: Replacing a method on an instance in Ruby
layout: post
date: 2010-12-18
type: regular
---

I just read a [post by David Tchepak](http://www.davesquared.net/2010/12/revisting-replacing-ruby-instance.html) where he describes a way of replacing a method on an instance of a class on the fly, allowing the replacement to close over locals. This would be useful for unit testing at the least. The technique that Dave uses is cool – this is a simplified version:

	name = "Anonymous Dave"
	greeter.extend Module.new do
	  self.send(:define_method, :say_hello) do
	    puts "G'day #{name}"
	  end
	end

This is replacing the `greeter.say_hello` method with the closure on the fourth line. Since I’m spoiled by C#’s lambda syntax, I wanted to get this onto one line:

	greeter.extend Module.new { self.send(:define_method, :say_hello) { puts "G'day #{name}" }}

Nice, but there is a bit of repetition. `.extend` is a method on the Object class, which extends the instance with the new module. Unfortunately Object doesn’t have a method to just replace a single method. The following opens the Object and moves much of the boilerplate code into a new method to do that:

	class Object
	  def redefine(name, &block)
	    self.extend Module.new {
	      self.send(:define_method, name, block)
	    }
	  end
	end

`redefine` probably isn’t the best name, since there is no need for the named method to exist before redefining it. This is the new way to replace the say_hello method:

	greeter.redefine(:say_hello) { puts "G'day #{name}" }

Methods with parameters can be defined in the same way:

	greeter.redefine(:say_hello_to) { |another_name| puts "Hello to #{another_name}" }
	greeter.say_hello_to 'Dave'

Very cool. Many thanks to Dave Tchepak for his article, otherwise I wouldn’t have thought this was possible at all.
