"use strict";

const Matter = require('matter-js');
const MatterAttractors = require('../index.js');
const expect = require('chai').expect;

Matter.use(MatterAttractors);

describe(MatterAttractors.name, function() {
  it('has been installed', function() {
    expect(Matter.used).to.include(MatterAttractors.name);
  });

  it('has been registered', function() {
    expect(MatterAttractors.name in Matter.Plugin._registry).to.be.true;
  });

  it('adds attractors property to body', function() {
    let attractorBody = Matter.Bodies.circle(0, 0, 10);

    expect(attractorBody.plugin.attractors).to.exist;
  });

  it('applies attractor forces on engine update', function() {
    let attractorBody = Matter.Bodies.circle(0, 0, 10, {
      plugin: {
        attractors: [
          function(bodyA, bodyB) {
            expect(bodyA.id).to.equal(attractorBody.id);
            expect(bodyB.id).to.equal(attractedBody.id);

            return {
              x: 1,
              y: 1
            };
          },
          function(bodyA, bodyB) {
            expect(bodyA.id).to.equal(attractorBody.id);
            expect(bodyB.id).to.equal(attractedBody.id);

            return {
              x: 2,
              y: 2
            };
          }
        ]
      }
    });

    let attractedBody = Matter.Bodies.circle(0, 0, 10),
      engine = Matter.Engine.create();

    engine.world.gravity.scale = 0;
    Matter.World.add(engine.world, [attractorBody, attractedBody]);
    Matter.Engine.update(engine);

    expect(attractedBody.velocity.x).to.be.above(0);
    expect(attractedBody.velocity.y).to.be.above(0);
  });

  it('applies gravity attractor correctly', function() {
    let attractorBody = Matter.Bodies.circle(0, 0, 10, {
      plugin: {
        attractors: [
          MatterAttractors.Attractors.gravity
        ]
      }
    });

    let attractedBody = Matter.Bodies.circle(-20, -20, 10),
      engine = Matter.Engine.create();

    engine.world.gravity.scale = 0;
    Matter.World.add(engine.world, [attractorBody, attractedBody]);
    Matter.Engine.update(engine);

    expect(attractedBody.velocity.x).to.be.above(0);
    expect(attractedBody.velocity.y).to.be.above(0);
  });
});