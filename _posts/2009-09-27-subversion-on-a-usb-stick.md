---
title: Subversion on a USB stick
layout: default
tags:
  - subversion

type: regular
---

I use Subversion for version control at work, so I wanted to use it for a couple of websites and projects that I play with at home. I’ve been thinking about buying a cheap server or NAS that I could set up but couldn’t justify the cost and electricity just for want of version control.

As it happens, my Subversion client of choice TortoiseSVN can create and access local Subversion repositories. Probably all SVN clients can do this, and this is just a feature of the system, but when I’m used to seeing the version control purely as a client/server configuration this was a bit of a surprise. TortoiseSVN integrates nicely with Windows Explorer which makes it extremely easy to work with. If I had to load a seperate SVN client just to commit changes I would most likely put it off and/or forget about it. TortoiseSVN makes working with Subversion so easy that it is the main reason I keep giving up on Linux for my development machines.

One of the attractions of version control is that the project is portable – I can check out (make a local copy of) a website on my home PC, make changes, commit the changes to the server, then update the site on my laptop, without having to worry about copying files (and having different versions of files in the one place). That requires the Subversion server to be accessible on both machines, and if I don’t happen to have internet access for any reason that may not be possible.

Setting up a repository on a USB stick gives me most of the benefits of the typical client/server setup. The biggest downside is a lack of backups, which is something that needs to be maintained on a server anyway, and should be worked around by making backups of the repositories on the USB stick. In any case even if the repository fails I still should have multiple working copies on various machines. Not ideal but at least the files won’t be lost.

So how to do this? First install TortoiseSVN. I’m going to assume familiarity with SVN, and with TortoiseSVN in particular.

On the USB stick, make a folder to store the repositories. I called my folder svnrepos. Inside that folder, make another folder for the first repository. This is the name of the repository so call it something sexy, like `bentest`. Right click the folder, go to TortoiseSVN, and Create repository here. Wheels will turn, and a message should appear saying the repository was created.

Now go to your development folder, or wherever you want to check out a working copy of the project. Right-click the development folder (eg `C:\Development\www`) and select SVN Checkout.

The URL of repository is the path to the local repository that you created, as a file URL. Mine is `file:///E:/svnrepos/bentest` (note there are three slashes after the file: part). The checkout directory is where the working copy will be created. It should be automatically filled in when editing the repository URL, but can be changed. Mine is `C:\Development\www\bentest`. Click OK and you should have revision 0 of the repository ready to create trunk, branch and tag folders and add content.

Version control. Distributed backups of your precious work. No reliance on internet access and access to private Subversion server. Beautiful.

I haven’t experimented with this so far but I suspect there may be issues if the USB drive comes up on another driver letter. The repository url will probably need to be changed in the working copy. That should be possible via the Relocate command in TortoiseSVN’s context menu.

_UPDATE: Relocate is indeed the command to use. TortoiseSVN throws up a warning about corrupting your working copy, but as long as the path entered is the new path to the same place in the repository (eg from `file:///H:/svnrepos/bentest/trunk` to `file:///F:/svnrepos/bentest/trunk`) this is the best/only method._

