# matter-plugin-boilerplate

> A plugin boilerplate for [matter.js](https://github.com/liabru/matter-js/)

[![Build Status](https://travis-ci.org/liabru/matter-plugin-boilerplate.svg?branch=master)](https://travis-ci.org/liabru/matter-plugin-boilerplate)

This project helps you quickly start a production ready plugin.
If you just want to build something quickly, check out the [minimal plugin example](https://github.com/liabru/matter-js/wiki/Creating-plugins#example) first.

The wiki articles on [Using plugins](https://github.com/liabru/matter-js/wiki/Using-plugins) 
and [Creating plugins](https://github.com/liabru/matter-js/wiki/Creating-plugins) 
contain information on the plugin format and provide some best practices.
It can also be useful to study the implementation of [existing plugins](https://github.com/liabru/matter-js/wiki/Using-plugins#list-of-plugins).

## Features

- a simple plugin example (`matter-js`)
- build, develop and release scripts (`npm run <x>`)
- a bundler and dev server (`webpack`)
- an ES6 transpiler (`babel`)
- a linter (`eslint`)
- a test suite (`mocha` and `chai`)
- a documentation generator (`markdox`)
- a demo runner (`matter-tools`)
- continuous integration (`travis`)

## Usage

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository or clone it
1. Update `package.json`
1. Run `npm install && npm run build`
1. [Implement]((https://github.com/liabru/matter-js/wiki/Creating-plugins)) your [plugin code](index.js)
1. Create a [examples](docs/examples/basic.js)
1. Write [tests](test/test.spec.js)
1. Document the code
1. Release your plugin (see [commands](#commands))
1. Enable [Github Pages](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch) to serve the [demo](https://liabru.github.io/matter-plugin-boilerplate/)
1. Setup [Travis CI](https://travis-ci.org/) (optional)
1. Update the readme

### Notes

Running a build will automatically replace strings commented with `PLUGIN_NAME`, `PLUGIN_VERSION` 
and `PLUGIN_REPO_URL` with constants pulled directly from `package.json`.
Leave these intact unless you wish to manually keep them up to date.

The included plugin is a very basic example that just sets the friction of all bodies to `0` after creation.

## Commands

All commands are implemented as [npm scripts](https://docs.npmjs.com/misc/scripts):

- `npm run build` - builds the plugin
- `npm run dev` - runs development server
- `npm run test` - runs tests
- `npm run lint` - runs linter
- `npm run doc` - outputs docs to `API.md`
- `npm run release` - lint, test, bump minor, build, doc, commit, tag, push, publish (any will stop all on failure)
- `npm run release-patch` - same as above but patch bump