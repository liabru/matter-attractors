

<!-- Start index.js -->

## MatterAttractors

An attractors plugin for matter.js.
See the readme for usage and examples.

## MatterAttractors.Body.init(body)

Initialises the `body` to support attractors.
This is called automatically by the plugin.

### Params:

* **Matter.Body** *body* The body to init.

### Return:

* No return value.

## MatterAttractors.Engine.update(engine)

Applies all attractors for all bodies in the `engine`.
This is called automatically by the plugin.

### Params:

* **Matter.Engine** *engine* The engine to update.

### Return:

* No return value.

## MatterAttractors.Attractors

Defines some useful common attractor functions that can be used 
by pushing them to your body's `body.plugin.attractors` array.

### Properties:

* **number** *gravityConstant* The gravitational constant used by the gravity attractor.

## MatterAttractors.Attractors.gravity(bodyA, bodyB)

An attractor function that applies Newton's law of gravitation.
Use this by pushing `MatterAttractors.Attractors.gravity` to your body's `body.plugin.attractors` array.
The gravitational constant defaults to `0.001` which you can change 
at `MatterAttractors.Attractors.gravityConstant`.

### Params:

* **Matter.Body** *bodyA* The first body.
* **Matter.Body** *bodyB* The second body.

### Return:

* No return value.

## Matter.Body

See: http://brm.io/matter-js/docs/classes/Body.html

This plugin adds a new property `body.plugin.attractors` to instances of `Matter.Body`.  
This is an array of callback functions that will be called automatically
for every pair of bodies, on every engine update.

### Properties:

* **Array.\<Function>** *body.plugin.attractors* 

An attractor function calculates the force to be applied
to `bodyB`, it should either:
- return the force vector to be applied to `bodyB`
- or apply the force to the body(s) itself

### Params:

* **Matter.Body** *bodyA* 
* **Matter.Body** *bodyB* 

### Return:

* **Vector** a force vector (optional)

<!-- End index.js -->

<!-- Start webpack.config.js -->

<!-- End webpack.config.js -->

