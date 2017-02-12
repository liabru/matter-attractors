# matter-attractors

> An attractors plugin for [matter.js](https://github.com/liabru/matter-js/)

[![Build Status](https://travis-ci.org/liabru/matter-attractors.svg?branch=master)](https://travis-ci.org/liabru/matter-plugin-boilerplate)

## Demo

See the [demo](http://liabru.github.io/matter-attractors).

![matter-attractors](docs/attractors.gif)

## Install

Get the [matter-attractors.js](build/matter-attractors.js) file directly or get it via npm:

    npm install matter-attractors

### Dependencies

- [matter.js](https://github.com/liabru/matter-js/)

## Usage

```js
Matter.use('matter-attractors');
// or
Matter.use(MatterAttractors);
```

See [Using Plugins](https://github.com/liabru/matter-js/wiki/Using-plugins#using-plugins) for more information.

An example of a body that attracts other bodies:

```js
var body = Matter.Bodies.circle(0, 0, 10, {
  plugin: {
    attractors: [
      function(bodyA, bodyB) {
        return {
          x: (bodyA.position.x - bodyB.position.x) * 1e-6,
          y: (bodyA.position.y - bodyB.position.y) * 1e-6,
        };
      }
    ]
  }
);
```

## Examples

See the [examples](docs/examples).

## Documentation

See the [API docs](API.md).