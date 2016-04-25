'use strict'

var Vec2 = require('vec2')

function Circle (position, radius) {
  if (!(this instanceof Circle)) {
    return new Circle(position, radius)
  }

  if (Array.isArray(position)) {
    this.position = new Vec2(position[0], position[1])
  } else {
    this.position = position ? new Vec2(position.x, position.y) : new Vec2(0, 0)
  }

  this.radius = Vec2.clean(radius || 1)
}

Circle.prototype.radius = 1

Circle.prototype.position = null

Circle.prototype.containsPoint = function (vec) {
  if (Array.isArray(vec)) {
    vec = Vec2.fromArray(vec)
  } else {
    vec = Vec2(vec)
  }

  // return Vec2.clean(this.position.distance(vec)) <= this.radius
  return Math.round(this.position.distance(vec) * 10000000) / 10000000 <= this.radius // only use precision of 7 for comparison
}

Circle.prototype.intersectCircle = function (circle) {
  var p1 = this.position
  var p2 = circle.position
  var r1 = this.radius
  var r2 = circle.radius

  if (p1.equal(p2)) {
    // identical circles
    if (r1 === r2) {
      return []

    // no intersection because one circle is
    // contained in the other
    } else {
      return false
    }
  }

  var d = p1.distance(p2)

  // check if both circles to far away or contained in eachother
  if (d < r1 - r2) return false
  if (d > r1 + r2) return false

  // single intersection
  if (d === r1 + r2) {
    return [p1.subtract(p2, true).divide(2).add(p2)]
  }

  var a = (r1 * r1 - r2 * r2 + d * d) / (2 * d)
  var h = Math.sqrt(r1 * r1 - a * a)
  var x0 = p1.x + a * (p2.x - p1.x) / d
  var y0 = p1.y + a * (p2.y - p1.y) / d
  var rx = -(p2.y - p1.y) * (h / d)
  var ry = -(p2.x - p1.x) * (h / d)

  return [
    new Vec2(x0 + rx, y0 - ry),
    new Vec2(x0 - rx, y0 + ry)
  ]
}

module.exports = Circle
