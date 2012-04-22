---
title: Quick fix for Skype messing around with phone numbers and ABNs on websites
layout: post
date: 2010-12-13
type: regular
---

The Skype plugin for Internet Explorer finds text it thinks is phone numbers and adds controls around it to let the user call the number via Skype. Nasty work. Especially since it also picks up ABNs, company numbers, etc, and tends to break the page layout as well.

To fix it, this meta declaration needs to be added to the `head` element:

	<meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />
