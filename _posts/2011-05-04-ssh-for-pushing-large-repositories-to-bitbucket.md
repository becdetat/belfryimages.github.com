---
title: SSH for pushing large repositories to BitBucket
layout: post
date: 2011-05-04
type: regular
---

I'm trying to push a very large (for me) repository to [BitBucket][1]. The `.hg` folder is 2.5 G which is a pretty big chunk. This is my first time using BitBucket, in fact until now my experience of hosting Mercurial repos has been limited to either file shares or `hg serve`, so initially I tried pushing over HTTP.

Four hours later and no real data had been sent, so I did some looking and decided to try using SSH. It seems to be working well at the moment (still sending as I type) but I'm not going to attempt writing my own tutorial so here are some links I found useful:

- [AccessingSshRepositoriesFromWindows][2]
- [codza - mercurial with ssh setup on windows][3]
- [PuTTY][4]

[1]: http://bitbucket.org
[2]: http://mercurial.selenic.com/wiki/AccessingSshRepositoriesFromWindows
[3]: http://www.codza.com/mercurial-with-ssh-setup-on-windows
[4]: http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html
