---
title: Fixing "iertutil.dll was not found" after a Windows XP update
layout: post
date: 2012-02-07
---

An XP machine wasn't working after an update. When we logged in an error popped up saying `iertutil.dll was not found`, and running `explorer` from task manager gave a cascade of the same errors. Following [these instructions][1] I found `iertutil.dll` in `C:\Windows\system32\dllcache` and copied it into `C:\Windows\system32` using Tak Manager's Open dialog. Grooving.

[1]: http://answers.microsoft.com/en-us/windows/forum/windows_xp-system/system-has-failed-because-iertutildll-was-not/6dd913ba-cc0f-4828-a55a-477771d25b66
