---
title: Editing past log comments in Subversion
layout: default
tags:
  - source control
  - subversion

type: regular
---

Subversion is my source version control software of choice, but it’s not immediately obvious how to edit the log comment of a past commit (such as after adding a particularly scathing remark that may not be a wise career move). A caveat is that you need to have administrator access to the Subversion repository.

In the repository directory (wherever you created the repository) is a hooks folder (on my system this is `H:\IT\svnrepos\pas\hooks`). This folder contains scripts that are called by Subversion when various events occur (hooks). The files that are created in a repository’s hooks folder by default are templates of hooks designed for Linux etc. On a Windows server they need to be created as batch files (*.bat) to be executed.

What you need to do is create a hook that will run prior to changing a revision property (such as a log comment) and let Subversion know that changing the comment is permitted. By default changing the log comment is disabled (obviously, or you wouldn’t be reading this). Make a new file in the `hooks` folder called `pre-revprop-change.bat` and write the following into it:

    if "%4" == "svn:log" exit 0
    echo Property '%4' cannot be changed >&2
    exit 1

The `%4` argument contains which operation is being performed. If the operation is `svn:log` we indicate success, which is a return code of 0. Otherwise it prints an error and exits with a non-zero, which indicates an error (and that the operation shouldn’t be allowed). Once that is saved, you should be able to use your to Subversion client to edit the comment. Be careful with what you do, as revision properties aren’t versioned, and you won’t be able to undo your changes. You should also probably rename `pre-revprop-change.bat` to `pre-revprop-change.bat.bak` once finished.

