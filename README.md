# american-shavian-transliterator

⚠️  **This project is a WIP:** It has known issues and is not 100% accurate. Checkout [Dave Coffin's Shavian converter](https://dechifro.org/shavian/) for a more accurate tool. ⚠️

This Node.js module transliterates English written in the Latin alphabet to the [Shavian alphabet](https://www.shavian.info/)
exactly as it is pronounced in the "general" American dialect. You can use it at: https://mxskylar.github.io/american-shavian-transliterator/

The [CMU Pronouncing Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict) and [pronouncingjs](https://github.com/aparrish/pronouncingjs)
package are used to determine how words are pronounced.

## Developer Setup

To setup a local developer environment for this project, you will need:

1. The correct version of node installed. The easiest way to do that is to use [nvm](https://github.com/nvm-sh/nvm). Run `nvm use`.
2. Dependencies installed. Run `make dependencies`.
3. Git hooks setup to ensure that [artifacts built for browsers](#build-for-browser) are committed. Run `git config core.hooksPath ".githooks"`.

## Build for Browser

To build a minified JavaScript file optimized for browsers, run:

```bash
make browser-bundle
```

You can run this in your browser locally by opening [index.html](./index.html).
