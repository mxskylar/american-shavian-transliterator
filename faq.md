---
layout: default
---

## What is the Shavian alphabet?

The [Shavian alphabet](https://www.shavian.info/) is an alternative alphabet for English.
It is [phonemic](https://en.wikipedia.org/wiki/Phonemic_orthography) and is capable
of representing words exactly as they are pronounced, depending on how you spell with it.

## How does this tool spell in Shavian?

This transliterator use the [CMU Pronouncing Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict)
to determine how words are poronounced in the ["general" American dialect](https://en.wikipedia.org/wiki/General_American_English).
Unlike [standard Shavian spelling](https://www.shavian.info/spelling/), it spells words exactly as they are pronounced.

The [pronouncingjs](https://github.com/aparrish/pronouncingjs) package by `aparrish` is used to access the CMU dictionary.

## How does this tool handle punctuation?

All original punctuation is preserved, except for apostrophes, which are stripped away.
Shavian namer-dots for proper nouns are **not** used.

## Are there other Shavian transliterators that I can use?

There are! You can find some of them [here](https://www.shavian.info/resources/).

## Where can I find the source code for this project?

Right [here](https://github.com/mxskylar/american-shavian-transliterator)!