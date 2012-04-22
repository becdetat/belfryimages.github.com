---
title: Running etherpad-lite from source on Windows 
layout: default
date: 2011-12-23
---

1. Fork and clone etherpad-lite
2. Install node.js windows installer (MSI) from http://nodejs.org
    - This includes NPM (Node Package Manager)
    - Path to `node.exe` and `npm.cmd` are added to the path (restart console)
3. Download `curl.exe` (http://curl.haxx.se) and save it to somewhere in the path
4. Open the `var` folder and delete any files named `minified*`
5. Check the required versions of files:
    - jQuery, from `bin/installDeps.sh`
    - node.js, from `bin/buildForWindows.sh`
6. From the `etherpad-lite` directory, run the following commands (note this was tested using PowerShell, may be different for cmd.exe): 
    - copy settings.json.template_windows settings.json
    - npm install
    - curl -lo static\js\jquery.min.js http://code.jquery.com/jquery-1.7.min.js
    - copy static\custom\js.template static\custom\index.template
    - copy static\custom\js.template static\custom\pad.template
    - copy static\custom\js.template static\custom\timeslider.template
    - copy static\custom\css.template static\custom\index.template
    - copy static\custom\css.template static\custom\pad.template
    - copy static\custom\css.template static\custom\timeslider.template
    - curl -lo bin\node.exe http://nodejs.org/dist/v0.6.5/node.exe
7. Run `start.bat`
