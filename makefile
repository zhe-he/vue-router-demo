PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash
.PHONY: build

build: node_modules
	cross-env NODE_ENV=production && rm -rf ./dist && webpack -p --config build --progress --colors

run: node_modules
	cross-env NODE_ENV=development && node build/dev-client

pack: node_modules
	node build/build-pack

clean: node_modules
	node build/build-clean

test: node_modules
	node build/build-server

node_modules: 
	cnpm install
	