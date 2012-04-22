---
title: Form validation with jQuery
layout: default
tags:
  - html
  - javascript
  - jquery

type: regular
---

Every time I’ve implemented client-side form validation I’ve started from scratch and done it a little differently. Usually it devolves into a messy set of `if` statements and duplicated code. Here’s my latest method, which separates the validation rules from the processing. This will only handle relatively simple validation cases.

So start with a form:

    <form id="mailingListSubscription" action="subscribe.php">
        Name: <input type="text" name="name" id="name" /><br />
        Email: <input type="text" name="email" id="email" /><br />
        Phone: <input type="text" name="phone" id="phone" /><br />
        <button type="submit">Subscribe</button>
    </form>

All fields are required, and I’m going to use some magical regex (found on the interthingy somewhere) to validate the email address. This script sets up the rules:

    var rules = [
        { id: 'name', test: function(val) { return val != ''; }, msg: 'Please enter your name' },
        { id: 'email', test: function(val) { return val.search(/^[^@]+@[^@]+.[a-z]{2,}$/i) != -1; }, msg: 'Please enter a valid email address' },
        { id: 'phone', test: function(val) { return val != ''; }, msg: 'Please enter your phone number' }
    ];

Each rule has the id of the form element being tested, a message that gets displayed on failing the rule, and a function that validates the value of the form element. I also could add multiple rules for the one input.

This script sets up the submit handler for the form, which does the validation using the array of rules set up above:

    $(function(){
        $('form#mailingListSubscription').submit(function(){
            for (var i = 0; i < rules.length; i ++) {
                var rule = rules[i];
                var target = $('#'+rule.id);
                if (!rule.test(target.val())) {
                    alert(rule.msg);
                    target.focus();
                    return false;
                }
            }
            return true;
        });
    });

On a test failing, the rule’s msg value is shown and the target of the test gets focus. This could be changed to something more user friendly like showing the message next to the target field.

