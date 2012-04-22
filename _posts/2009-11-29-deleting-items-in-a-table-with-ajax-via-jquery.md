---
title: Deleting items in a table with AJAX via JQuery
layout: default
tags:
  - html
  - javascript
  - jquery

type: regular
---

This is a very straight-forward tutorial on implementing a jQuery-driven ‘delete via AJAX’ feature. Say we have a plain HTML table containing a list of items and a ‘Remove’ link. I’m not going to describe the back-end, but I’m assuming something groovy like [CakePHP][1] or [ASP.NET MVC][2]. I’ve also assumed that the delete request always succeeds and never returns an error, which may not be the case. The script itself is a more than required but is my preferred method as I can extend the elements in the UI fairly easily.

    <table>
        <tr><td>Chickpeas</td>      <td><a href="/items/delete/1" class="delete">Delete</a>    </td></tr>
        <tr><td>Garlic</td>         <td><a href="/items/delete/2" class="delete">Delete</a></td></tr>
        <tr><td>Olive oil</td>      <td><a href="/items/delete/3" class="delete">Delete</a></td></tr>
        <tr><td>Tahini</td>         <td><a href="/items/delete/4" class="delete">Delete</a></td></tr>
        <tr><td>Cumin</td>          <td><a href="/items/delete/5" class="delete">Delete</a></td></tr>
        <tr><td>Lemon juice</td>    <td><a href="/items/delete/6" class="delete">Delete</a></td></tr>
    </table>

The delete hrefs (`/items/delete/XX`) link to an action or page that deletes the specified item and returns a HTTP status of 200 (OK). If the action just redirected to the current page then this table should work as it stands, which is probably a good way to check that everthing works as expected without involving AJAX features. If you just want to set up the client side without implementing any server-side code, create the following in delete_test.php and use it for the delete links:

    <?php header('HTTP/1.1 200 OK'); ?>

Make sure that jQuery 1.3+ has been included in the page and add the following:

	<script type="text/javascript">
	$(function(){
	    var ui = {
	        init: function(){
	            $('a.delete').live('click', ui.delete_click);
	        },
	 
	        delete_click: function(){
	            link = this;
	            $.get(link.href, function(data, status) {
	                $(link).parents('tr').remove();
	            });
	            return false;
	        }
	    };
	 
	    ui.init();
	});
	</script>

Very basic stuff but it works. It could be jazzed up by fading out the items first or updating a status label. If there is a significant delay between calling the delete action and getting a response the user may not think anything has happened, so perhaps the delete link should change or be disabled.

[1]: http://cakephp.org/
[2]: http://www.asp.net/mvc/
