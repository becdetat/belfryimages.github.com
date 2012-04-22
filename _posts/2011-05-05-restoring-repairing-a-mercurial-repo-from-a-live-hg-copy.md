---
title: Restoring/repairing a Mercurial repo from a live .hg copy
layout: default
date: 2011-05-05
type: regular
---

I needed a quick way to clone a repository without any network access. There is probably an easy, safe way of making a bundle to clone from but for now I just copied a live `.hg` folder into the destination folder and ran `hg revert --all`. Seems to be relatively stable. Copying the whole repository would have worked as well and wouldn't require setting up the working copy, but would have taken much longer to compress, copy and decompress.
