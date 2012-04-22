---
Title: Rebasing in Git
layout: post
comments: true
date: ...
---

	git fetch origin master
	git rebase origin/master

There will be a pile of messages. If there are conflicts, it will say something about 'when you have resolved this problem', and if you are using Git Bash the branch name will be something like `((96f4954...)|REBASE)`.

## Resolving conflicts

Look through the results for lines starting with `CONFLICT`. You need to resolve these by manually editing the conflicting areas. The [Git manual](http://schacon.github.com/git/user-manual.html#resolving-a-merge) has some more details. Try `git mergetool` if you have one of the TortoiseXXX tools, or some other merge tool installed. Otherwise, just open the file and look for areas like this:

	<<<<<<< HEAD
		Hello world
	=======
		Goodbye world
	>>>>>>> your branch name

Edit out the conflict (including the `<<<` and `>>>` lines) and save. When all the conflicts are resolved, add the changes with `git add -A` then continue the rebase with `git rebase --continue`).

If you screw something up, you can abort the rebase with `git rebase --abort`.



## Resources

- http://reinh.com/blog/2009/03/02/a-git-workflow-for-agile-teams.html