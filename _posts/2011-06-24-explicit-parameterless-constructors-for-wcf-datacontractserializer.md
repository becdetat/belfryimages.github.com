---
title: Explicit, parameterless constructors for WCF DataContractSerializer
layout: default
date: 2011-06-24
type: regular
---

So WCF in .NET 3.5 SP1 can (de)serialise POCOs without a default, parameterless constructor <small>citation needed :-P</small>. But if your POCO has _any_ constructor at all, there has to be an explicit parameterless constructor as well.

Yeah that makes sense, but it's still yet another pain point when you're refactoring a library that is a dependency for a number of applications and one of those applications happens to be a WCF service, and there is no compile-time failure. I guess I need some automated tests that consume a running service.
