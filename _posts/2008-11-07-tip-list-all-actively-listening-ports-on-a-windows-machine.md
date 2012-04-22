---
title: Tip - list all actively listening ports on a Windows machine
layout: post
date: 2008-11-07
type: regular
---

Finding out what ports are open on a machine is something I often need to do, and I usually stuff around for ages trying to figure out whether a particular port is open. The fastest way I've (just) found is by opening a console and running `netstat -a`, or `netstat -an` to show IP and port numbers rather than machine and service names.

Now that I know that the port's definitely open, I've just got to figure out why the service still isn't working...

