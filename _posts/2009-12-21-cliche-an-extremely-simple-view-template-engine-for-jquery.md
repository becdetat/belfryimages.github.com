---
title: Cliche – an extremely simple view template engine for jQuery
layout: post
date: 2009-12-21
type: regular
---

I’ve written a very simple plugin for jQuery that takes a template and a model and returns a view of the model. <strike>To make sure it worked I wrote some tests and examples, and since I did that I figured I would write a little mini-site.</strike> The plugin itself is pretty straightforward:

    (function($){
        $.fn.cliche = function(model){
            var template = $(this).html();
            template = template.replace(/%7C/g, '|');   // pipes in a href like <a href="|... get converted to %7C, convert it back
            template = template.replace(/\|.*?\|/g, function(f) {
                var val = model;
                var fieldParts = f.replace(/\|/g, '').split('.');
                for (var i = 0; i < fieldParts.length; i ++) {
                    val = val[fieldParts[i]];
                }
                return val;
            });
            return template;
        };
    }(jQuery));

It is used by setting up a template (putting it into a `script type="text/html`" block is convenient and hides it from display) and calling cliche(model) on the jQuery object:

    <div id="output">
        <ul></ul>
    </div>
    <script type="text/html" id="testTemplate">
        <li id="item|id|"><a href="viewItem?id=|id|">|name|</a></li>
    </script>
    <script type="text/javascript">
        $('#output ul').append(
            $('#testTemplate').cliche({
                id: 1, name: 'Lorem'
            })
        );
    </script>

<strike>Cliche is licensed under a Creative Commons Attribution 2.5 Australia license. Check it out at http://cliche.belfryimages.com.au.</strike>

