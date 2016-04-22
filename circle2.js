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
  this._radiusSquared = this.radius * this.radius
}

Circle.prototype.radius = 1
Circle.prototype._radiusSquared = 1

Circle.prototype.position = null

Circle.prototype.containsPoint = function (vec) {
  if (Array.isArray(vec)) {
    vec = Vec2.fromArray(vec)
  } else {
    vec = Vec2(vec)
  }

  return this.position.subtract(vec, true).lengthSquared() <= this._radiusSquared
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

  var d2 = p1.subtract(p2, true).lengthSquared()
  var rsquared = (r1 + r2) * (r1 + r2)
  if (d2 > rsquared) {
    return false

  // single intersection
  } else if (d2 === rsquared) {
    return [p1.subtract(p2, true).divide(2).add(p2)]
  }

  var d = Math.sqrt(d2)
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
