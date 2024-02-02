# american-shavian-transliterator

Transliterates English written in the Roman alphabet to the [Shavian alphabet](https://www.shavian.info/)
as pronounced in the "general" American accent, according to the [CMU Pronouncing Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict).
The [pronouncingjs](https://github.com/aparrish/pronouncingjs) package by `aparrish` is used to interface with the CMU Dictionary.

## CLI

Once you have installed node & the dev dependencies for this project, the transliteration script can be run over the CLI like so:

```bash
npx tsx src/index.ts
```

## Build for Browser

To build a minified JavaScript file optimized for browsers, run the following:

```bash
npm explore pronouncing -- npm run build
npx webpack
```
