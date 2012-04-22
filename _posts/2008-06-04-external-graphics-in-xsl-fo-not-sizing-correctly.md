---
title: External graphics in XSL:FO not sizing correctly
layout: post
date: 2008-06-04
type: regular
---

I’m using [Apache FOP][1] to generate PDFs from [XSL:FO][2], and an external graphic (think the `<img>` tag in HTML) kept being resized incorrectly. Another image (different size) was the correct size on the page. Turns out I was using height and width attributes in the `fo:external-graphic` element, when I should have been using `content-height` and `content-width`. Somehow the second image respected the height and width I wanted. Possibly this has something to do with the stored DPI of the images (since XSL:FO is a specification for printed documents), but in any case content-width and content-height is the way to go. Way to go, Ben :P

[1]: http://xmlgraphics.apache.org/fop/
[2]: http://www.w3.org/TR/xsl
