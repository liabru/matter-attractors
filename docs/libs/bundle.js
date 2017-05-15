/*!
 * matter-attractors 0.1.6 by Liam Brummitt 2017-05-15
 * https://github.com/liabru/matter-attractors
 * License MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("matter-js"));
	else if(typeof define === 'function' && define.amd)
		define(["matter-js"], factory);
	else if(typeof exports === 'object')
		exports["MatterAttractors"] = factory(require("matter-js"));
	else
		root["MatterAttractors"] = factory(root["Matter"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/libs";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Matter = __webpack_require__(0);

/**
 * An attractors plugin for matter.js.
 * See the readme for usage and examples.
 * @module MatterAttractors
 */
var MatterAttractors = {
  // plugin meta
  name: 'matter-attractors', // PLUGIN_NAME
  version: '0.1.4', // PLUGIN_VERSION
  for: 'matter-js@^0.12.0',

  // installs the plugin where `base` is `Matter`
  // you should not need to call this directly.
  install: function install(base) {
    base.after('Body.create', function () {
      MatterAttractors.Body.init(this);
    });

    base.before('Engine.update', function (engine) {
      MatterAttractors.Engine.update(engine);
    });
  },

  Body: {
    /**
     * Initialises the `body` to support attractors.
     * This is called automatically by the plugin.
     * @function MatterAttractors.Body.init
     * @param {Matter.Body} body The body to init.
     * @returns {void} No return value.
     */
    init: function init(body) {
      body.plugin.attractors = body.plugin.attractors || [];
    }
  },

  Engine: {
    /**
     * Applies all attractors for all bodies in the `engine`.
     * This is called automatically by the plugin.
     * @function MatterAttractors.Engine.update
     * @param {Matter.Engine} engine The engine to update.
     * @returns {void} No return value.
     */
    update: function update(engine) {
      var world = engine.world,
          bodies = Matter.Composite.allBodies(world);

      for (var i = 0; i < bodies.length; i += 1) {
        var bodyA = bodies[i],
            attractors = bodyA.plugin.attractors;

        if (attractors && attractors.length > 0) {
          for (var j = i + 1; j < bodies.length; j += 1) {
            var bodyB = bodies[j];

            for (var k = 0; k < attractors.length; k += 1) {
              var attractor = attractors[k],
                  forceVector = attractor;

              if (Matter.Common.isFunction(attractor)) {
                forceVector = attractor(bodyA, bodyB);
              }

              if (forceVector) {
                Matter.Body.applyForce(bodyB, bodyB.position, forceVector);
              }
            }
          }
        }
      }
    }
  },

  /**
   * Defines some useful common attractor functions that can be used 
   * by pushing them to your body's `body.plugin.attractors` array.
   * @namespace MatterAttractors.Attractors
   * @property {number} gravityConstant The gravitational constant used by the gravity attractor.
   */
  Attractors: {
    gravityConstant: 0.001,

    /**
     * An attractor function that applies Newton's law of gravitation.
     * Use this by pushing `MatterAttractors.Attractors.gravity` to your body's `body.plugin.attractors` array.
     * The gravitational constant defaults to `0.001` which you can change 
     * at `MatterAttractors.Attractors.gravityConstant`.
     * @function MatterAttractors.Attractors.gravity
     * @param {Matter.Body} bodyA The first body.
     * @param {Matter.Body} bodyB The second body.
     * @returns {void} No return value.
     */
    gravity: function gravity(bodyA, bodyB) {
      // use Newton's law of gravitation
      var bToA = Matter.Vector.sub(bodyB.position, bodyA.position),
          distanceSq = Matter.Vector.magnitudeSquared(bToA) || 0.0001,
          normal = Matter.Vector.normalise(bToA),
          magnitude = -MatterAttractors.Attractors.gravityConstant * (bodyA.mass * bodyB.mass / distanceSq),
          force = Matter.Vector.mult(normal, magnitude);

      // to apply forces to both bodies
      Matter.Body.applyForce(bodyA, bodyA.position, Matter.Vector.neg(force));
      Matter.Body.applyForce(bodyB, bodyB.position, force);
    }
  }
};

Matter.Plugin.register(MatterAttractors);

module.exports = MatterAttractors;

/**
 * @namespace Matter.Body
 * @see http://brm.io/matter-js/docs/classes/Body.html
 */

/**
 * This plugin adds a new property `body.plugin.attractors` to instances of `Matter.Body`.  
 * This is an array of callback functions that will be called automatically
 * for every pair of bodies, on every engine update.
 * @property {Function[]} body.plugin.attractors
 * @memberof Matter.Body
 */

/**
 * An attractor function calculates the force to be applied
 * to `bodyB`, it should either:
 * - return the force vector to be applied to `bodyB`
 * - or apply the force to the body(s) itself
 * @callback AttractorFunction
 * @param {Matter.Body} bodyA
 * @param {Matter.Body} bodyB
 * @returns {Vector|undefined} a force vector (optional)
 */

/***/ })
/******/ ]);
});