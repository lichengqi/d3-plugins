require("d3");
require("./projection");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.projection");

var π = Math.PI;

suite.addBatch({
  "d3.geo.bonne": {
    "40° parallel": {
      topic: function() {
        return d3.geo.bonne().parallel(40);
      },
      "projections and inverse projections": function(bonne) {
        assertEqualInverse(bonne, [   0,   0], [480,        354.719755]);
        assertEqualInverse(bonne, [   0, -90], [480,        590.339204]);
        assertEqualInverse(bonne, [   0,  90], [480,        119.100306]);
        assertEqualInverse(bonne, [   0, -45], [480,        472.529479]);
        assertEqualInverse(bonne, [   0,  45], [480,        236.910030]);
        assertEqualInverse(bonne, [-180,   0], [197.703665,  45.328000]);
        assertEqualInverse(bonne, [ 180,   0], [762.296334,  45.328000]);
        assertEqualInverse(bonne, [-179,  15], [245.482446,   3.108766]);
        assertEqualInverse(bonne, [   1,   1], [482.617557, 352.089563]);
      }
    },
    "90° parallel (Werner)": {
      topic: function() {
        return d3.geo.bonne().parallel(90);
      },
      "projections and inverse projections": function(bonne) {
        assertEqualInverse(bonne, [0, 0], [480, 485.619449]);
      }
    },
    "0° parallel (sinusoidal)": {
      topic: function() {
        return d3.geo.bonne().parallel(0);
      },
      "projections and inverse projections": function(bonne) {
        assertEqualInverse(bonne, [0, 0], [480, 250]);
      }
    }
  },
  "rotate": {
    "identity": {
      topic: function() {
        return d3.geo.equirectangular().rotate([0, 0]).translate([0, 0]).scale(1);
      },
      "projections and inverse projections": function(projection) {
        assertEqualInverse(projection, [   0,   0], [ 0,  0]);
        assertEqualInverse(projection, [-180,   0], [-π,  0]);
        assertEqualInverse(projection, [ 180,   0], [ π,  0]);
        assertEqualInverse(projection, [   0,  30], [ 0, -π / 6]);
        assertEqualInverse(projection, [   0, -30], [ 0,  π / 6]);
        assertEqualInverse(projection, [  30,  30], [ π / 6, -π / 6]);
        assertEqualInverse(projection, [  30, -30], [ π / 6,  π / 6]);
        assertEqualInverse(projection, [ -30,  30], [-π / 6, -π / 6]);
        assertEqualInverse(projection, [ -30, -30], [-π / 6,  π / 6]);
      }
    },
    "[30, 0]": {
      topic: function() {
        return d3.geo.equirectangular().rotate([30, 0]).translate([0, 0]).scale(1);
      },
      "projections and inverse projections": function(projection) {
        assertEqualInverse(projection, [   0,   0], [ π / 6,  0]);
        assertEqualInverse(projection, [-180,   0], [-5 / 6 * π,  0]);
        assert.inDelta(    projection( [ 180,   0]),[-5 / 6 * π,  0], 1e-6); // inverse is [-180, 0]
        assertEqualInverse(projection, [   0,  30], [ π / 6, -π / 6]);
        assertEqualInverse(projection, [   0, -30], [ π / 6,  π / 6]);
        assertEqualInverse(projection, [  30,  30], [ π / 3, -π / 6]);
        assertEqualInverse(projection, [  30, -30], [ π / 3,  π / 6]);
        assertEqualInverse(projection, [ -30,  30], [ 0    , -π / 6]);
        assertEqualInverse(projection, [ -30, -30], [ 0    ,  π / 6]);
      }
    },
    "[30, 30]": {
      topic: function() {
        return d3.geo.equirectangular().rotate([30, 30]).translate([0, 0]).scale(1);
      },
      "projections and inverse projections": function(projection) {
        assertEqualInverse(projection, [   0,   0], [ 0.5880026035475674, -0.44783239692893245]);
        assertEqualInverse(projection, [-180,   0], [-2.5535900500422257,  0.44783239692893245]);
        assert.inDelta(    projection( [ 180,   0]),[-2.5535900500422257,  0.44783239692893245], 1e-6); // inverse is [-180, 0]
        assertEqualInverse(projection, [   0,  30], [ 0.8256075561643480, -0.94077119517052080]);
        assertEqualInverse(projection, [   0, -30], [ 0.4486429615608479,  0.05804529130778048]);
        assertEqualInverse(projection, [  30,  30], [ 1.4056476493802694, -0.70695172788721770]);
        assertEqualInverse(projection, [  30, -30], [ 0.8760580505981933,  0.21823451436745955]);
        assertEqualInverse(projection, [ -30,  30], [ 0,                  -1.04719755119659760]);
        assertEqualInverse(projection, [ -30, -30], [ 0,                   0]);
      }
    },
    "oblique 30": {
      topic: function() {
        return d3.geo.equirectangular().oblique(30).translate([0, 0]).scale(1);
      },
      "projections and inverse projections": function(projection) {
        assertEqualInverse(projection, [   0,   0], [ 0, 0]);
        assertEqualInverse(projection, [-180,   0], [-π, 0]);
        assertEqualInverse(projection, [ 180,   0], [ π, 0]);
        assertEqualInverse(projection, [   0,  30], [-0.2810349015028135, -0.44783239692893245]);
        assertEqualInverse(projection, [   0, -30], [ 0.2810349015028135,  0.44783239692893245]);
        assertEqualInverse(projection, [  30,  30], [ 0.1651486774146268, -0.70695172788721760]);
        assertEqualInverse(projection, [  30, -30], [ 0.6947382761967031,  0.21823451436745964]);
        assertEqualInverse(projection, [ -30,  30], [-0.6947382761967031, -0.21823451436745964]);
        assertEqualInverse(projection, [ -30, -30], [-0.1651486774146268,  0.70695172788721760]);
      }
    },
    "[30, 30]; oblique 30": {
      topic: function() {
        return d3.geo.equirectangular().rotate([30, 30]).oblique(30).translate([0, 0]).scale(1);
      },
      "projections and inverse projections": function(projection) {
        assertEqualInverse(projection, [   0,   0], [ 0.2810349015028135, -0.67513153293703170]);
        assertEqualInverse(projection, [-180,   0], [-2.8605577520869800,  0.67513153293703170]);
        assert.inDelta(    projection( [ 180,   0]),[-2.8605577520869800,  0.67513153293703170], 1e-6); // inverse is [-180, 0]
        assertEqualInverse(projection, [   0,  30], [-0.0724760059270816, -1.15865677086597720]);
        assertEqualInverse(projection, [   0, -30], [ 0.4221351552567053, -0.16704161863132252]);
        assertEqualInverse(projection, [  30,  30], [ 1.2033744221750944, -1.21537512510467320]);
        assertEqualInverse(projection, [  30, -30], [ 0.8811235701944905, -0.18861638617540410]);
        assertEqualInverse(projection, [ -30,  30], [-0.7137243789447654, -0.84806207898148100]);
        assertEqualInverse(projection, [ -30, -30], [ 0,                   0]);
      }
    }
  }
});

suite.export(module);

assert.inDelta = function(actual, expected, delta, message) {
  if (!inDelta(actual, expected, delta)) {
    assert.fail(actual, expected, message || "expected {actual} to be in within *" + delta + "* of {expected}", null, assert.inDelta);
  }
};

function assertEqualInverse(projection, location, point) {
  assert.inDelta(projection(location), point, 1e-6);
  assert.inDelta(projection.invert(point), location, 1e-6);
  assert.inDelta(location, projection.invert(projection(location)), 1e-6);
  assert.inDelta(point, projection(projection.invert(point)), 1e-6);
}

function inDelta(actual, expected, delta) {
  return (Array.isArray(expected) ? inDeltaArray : inDeltaNumber)(actual, expected, delta);
}

function inDeltaArray(actual, expected, delta) {
  var n = expected.length, i = -1;
  if (actual.length !== n) return false;
  while (++i < n) if (!inDelta(actual[i], expected[i], delta)) return false;
  return true;
}

function inDeltaNumber(actual, expected, delta) {
  return actual >= expected - delta && actual <= expected + delta;
}
