"use strict";

const Matter = require('matter-js');

/**
 * An example plugin for matter.js.
 * @module PluginExample
 */
const PluginExample = {
  // plugin meta
  name: 'matter-plugin-boilerplate', // PLUGIN_NAME
  version: '0.1.0', // PLUGIN_VERSION
  for: 'matter-js@^0.12.0',

  // installs the plugin where `base` is `Matter`
  // you should not need to call this directly.
  install: function(base) {
    // after Matter.Body.create call our plugin init function
    base.after('Body.create', function() {
      PluginExample.Body.init(this);
    });
  },

  Body: {
    /**
     * Example function that removes friction every created body.
     * Automatically called by the plugin.
     * @function PluginExample.Body.init
     * @param {Matter.Body} body The body to init.
     * @returns {void} No return value.
     */
    init: function(body) {
      body.friction = 0;
    }
  }
};

Matter.Plugin.register(PluginExample);

module.exports = PluginExample;

/**
 * @namespace Matter.Body
 * @see http://brm.io/matter-js/docs/classes/Body.html
 */