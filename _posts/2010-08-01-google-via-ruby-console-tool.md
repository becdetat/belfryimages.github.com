---
title: Google via Ruby console tool
layout: post
date: 2010-08-01
type: regular
---

So I’ve been getting my console-fu on since moving to [Mercurial][http://blog.belfryimages.com.au/category/mercurial/] at work, and finding ways to get more efficient. One thing that bugs me is having to spend time grabbing the mouse to search Google via a browser. I’ve also wanted to spend some time with Ruby, so to acheive both goals I wrote a little script that uses the Google AJAX Search API, which returns search results as a JSON object. The full code is available as a [gist on my GitHub][http://gist.github.com/503145]. There are a couple of interesting (for me anyway) parts of the code that I’ll go through now.

The request/response is done via a HTTP GET responding with a JSON-serialised object graph. A query string is built up and parsed into a URI object (using the same reference), then the request is made and parsed from the text JSON representation into an associative array (the result of JSON.parse):

	require 'net/http'
	require 'json'
	...
	queryURI = "http://ajax.google....."
	queryURI = URI.parse(queryURI)
	 
	data = Net::HTTP.get_response(queryURI)
	data = data.body
	data = JSON.parse(data)

I’ve used both pre- and post-fix conditional structures:

	if command.to_i.to_s == command && (1..results.length).include?(command.to_i)
	  url = results[command.to_i - 1]['url']
	  puts "Opening #{url}"
	  `start #{url}`
	  command = ''
	end
	 
	page += 1 if command == '+'
	page -= 1 if command == '-'

Rather than using a not operator like ! the unless operator can be more fluent and easier to understand:

	command = '' unless ['+','-','q'].include?(command)

A problem with C#’s foreach loop syntax is that there is no easy way to include an index short of rolling your own and incrementing in the loop. Usually it is easier to resort to the less pretty for (var i = 0; i < ..; i++) syntax. Ruby includes a variant of Array::each that takes care of the index:

	results.each_with_index do |result, index|
	  # ...
	end

And of course writing two line breaks is very fun:

	2.times { puts '' }

All up it was very educational spending some time building something a bit significant in Ruby, and the result should hopefully be pretty fun to use.

