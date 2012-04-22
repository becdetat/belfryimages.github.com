---
title: Unit testing a WinForms ListView - getting the SelectedItems property
layout: post
date: 2010-12-22
type: regular
---

Quick tip / reminder to myself. I'm adding some tests to an ancient (almost two years old :-) ) Winforms control that uses a ListView. All I'm doing is making sure that a particular context menu item is enabled or disabled depending on the state of the object in the tag of the selected item in the ListView. The details aren't important. Trust me.

The issue is that since the control being tested is never actually displayed, the ListView control doesn't update its SelectedItems property. I found a Stack Overflow [question and answer][1] regarding this. The (marked as) 'correct' answer involves flashing up a hidden form containing the control. Potentially messy. If I was testing a form I could just flash that up but still, not an ideal solution. The [second answer][2] to the question does the trick. Fourth line is the money shot:

	// Select the first list view item:
	controlBeingTested.myListView.Items[0].Selected = true;
	// then trick controlBeingTested.myListView.SelectedItems into being updated:
	controlBeingTested.myListView.AccessibilityObject.ToString();

The downside is that the `Accessibility` reference needs to be added to the unit test assembly.

[1]: http://stackoverflow.com/questions/304844/why-do-selectedindices-and-selecteditems-not-work-when-listview-is-instantiated-i
[2]: http://stackoverflow.com/questions/304844/why-do-selectedindices-and-selecteditems-not-work-when-listview-is-instantiated-i/518411#518411
