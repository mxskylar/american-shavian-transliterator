# american-shavian-transliterator

This Node.js module transliterates English written in the Latin alphabet to the [Shavian alphabet](https://www.shavian.info/)
as it is pronounced in the "general" American dialect.

The [CMU Pronouncing Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict) and the [pronouncingjs](https://github.com/aparrish/pronouncingjs)
package by `aparrish` are used to determine how words are pronounced.

## Developer Setup

To setup a local developer environment for this project, you will need:

1. The correct version of node installed. The easiest way to do that is to use [nvm](https://github.com/nvm-sh/nvm). Run `nvm use`.
2. Dependencies installed. Run `make dependencies`.

## CLI with Node

To transliterate over the CLI with Node.js, run:

```bash
npm run transliterate
```

## Build for Browser

To build a minified JavaScript file optimized for browsers, run:

```bash
make browser-bundle
```

You can run this in your browser locally by opening [index.html](./index.html).
