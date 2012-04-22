---
title: Could not find resources exception when modifying a form class in Visual Studio .NET 2003
layout: default
tags:
  - visual studio
  - c-sharp

type: regular
---

I changed the name of a form class and added a new class at the top of the class file with the same name of the old form class, descending from the renamed class to avoid breaking old code. Then when I ran the app I got an exception saying that the form’s resources couldn’t be loaded. When I had a look at the resources file for the form (`<project folder>\obj\Debug`) a resources file was still being created for the old class name instead of the new one. Since this resources file is the one that gets linked into the DLL or exe, this meant that the new form class couldn’t find its resources. According to [Microsoft KB318603][1] this is because other class definitions located before the form class definition will be picked up when naming the resources file. So if this happens, move the other class to after the form class (ie the MyForm.cs file should contain first the MyForm class then any other classes).

Of course the best thing would be to move the other classes into another file but that sounds like work :-)

[1]: http://support.microsoft.com/kb/318603
