---
title: URL namespace access rights when developing WCF hosts
layout: default
date: 2011-05-09
type: regular
---

Running up a WCF service host on a new address gives this exception:

    Unhandled Exception: System.ServiceModel.AddressAccessDeniedException: HTTP could 
    not register URL http://+:61100/HelloWorld.svc/. Your process does not have access rights 
    to this namespace (see http://go.microsoft.com/fwlink/?LinkId=70353 for details). ---> 
    System.Net.HttpListenerException: Access is denied

The [link][1]  (Configuring HTTP and HTTPS on MSDN) is pretty useful, it resolves to [here][2] at the moment (go.microsoft.com seems to break links at times). In short, on Win7, open an administrator console and run this:

    netsh http add urlacl url=http://+:61100/HelloWorld.svc user=DOMAIN\USER

The error messages are pretty cryptic so good luck...

[1]: http://go.microsoft.com/fwlink/?LinkId=70353
[2]: http://msdn.microsoft.com/en-us/library/ms733768.aspx
