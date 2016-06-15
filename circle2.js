'use strict'

function geoDistance(point1, point2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(point1.latitude - point2.latitude);  // deg2rad below
    var dLon = deg2rad(point1.longitude - point2.longitude);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(point2.latitude)) * Math.cos(deg2rad(point1.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return (d * 1000);
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function Circle (position, radius) {
  if (!(this instanceof Circle)) {
    return new Circle(position, radius)
  }

  this.position = position
  this.radius = radius
}

Circle.prototype.radius = 1

Circle.prototype.position = null

Circle.prototype.containsPoint = function (point) {
  return geoDistance(this.position, point) <= this.radius
}

Circle.prototype.intersectCircle = function (circle) {
  var p1 = this.position
  var p2 = circle.position
  var r1 = this.radius
  var r2 = circle.radius

  if (p1.latitude == p2.latitude && p1.longitude == p2.longitude) {
    // identical circles
    if (r1 === r2) {
      return []

    // no intersection because one circle is
    // contained in the other
    } else {
      return false
    }
  }

  var d = geoDistance(p1, p2)

  // check if both circles to far away or contained in eachother
  if (d < r1 - r2) return false
  if (d > r1 + r2) return false

  //TODO: single intersection

  var a = (r1 * r1 - r2 * r2 + d * d) / (2 * d)
  var h = Math.sqrt(r1 * r1 - a * a)
  var x0 = p1.x + a * (p2.x - p1.x) / d
  var y0 = p1.y + a * (p2.y - p1.y) / d
  var rx = -(p2.y - p1.y) * (h / d)
  var ry = -(p2.x - p1.x) * (h / d)

  return [
    {latitude: x0 + rx, longitude: y0 - ry},
    {latitude: x0 - rx, longitude: y0 + ry}
  ]
}

module.exports = Circle
