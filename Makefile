SHELL := /bin/bash

.PHONY: dependencies browser-bundle

dependencies:
	npm install
	npm explore pronouncing -- npm run build

browser-bundle: dependencies
	npx webpack
