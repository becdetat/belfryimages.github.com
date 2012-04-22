---
title: Closing Mercurial branches
layout: default
date: 2011-05-29
type: regular
---

I've used two methods of closing branches in Mercurial.

### Non-destructively closing the branch

The first non-destructively closes the branch just so it doesn't show up in `hg heads`. You switch to the bad branch (use either the tag or revision number) then add a commit that closes the branch:

    hg up -C badbranch
    hg com --close-branch -m "closing this branch"
    hg up default

### Destroying all unwanted branches

The second destructively closes the branch, which can dramatically reduce the size of the repository's `.hg` folder. I did this when I was [moving my work repository to BitBucket][3]. It isn't an easy process and is very time consuming, and make sure you have backups.

Say you're in `C:\projects` and the repository you want to clone is in `C:\projects\my_repo`. You clone the entire repository, but only the heads that you want to keep:

    hg clone my_repo my_repo.clone --rev <revision> --rev <another revision> ...

For example, I only wanted to save my `default` and `stable` branches, so I used `hg clone my_repo my_repo.clone --rev default --rev stable`.

Then verify that the differences between the original and the cloned repository are only the branches you wanted to drop:

    hg incoming -R my_repo.clone my_repo

If you missed some changesets in the clone step you can pull them over:

    hg pull -R my_repo.clone my_repo --rev <missed revision>

You then need to copy over non-tracked files from the original repository, especially `.hg\hgrc`, as the cloned repository is pointing to the original repository by default.

I had issues getting the trimmed repository over to other copies of the repository. In particular I couldn't `hg pull` from the trimmed repository any more. I ended up just copying the entire repository to my different machines and set them up from there.

The [Mercurial Wiki][1] has a fine page on [pruning branches][2] which is where I found these methods.

[1]: http://mercurial.selenic.com/wiki/Mercurial
[2]: http://mercurial.selenic.com/wiki/PruningDeadBranches
[3]: http://blog.belfryimages.com.au/post/5203916079/ssh-for-pushing-large-repositories-to-bitbucket
