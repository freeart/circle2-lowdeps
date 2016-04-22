var Circle = require('../circle2.js')
var Vec2 = require('vec2')
var should = require('should')

// use should for linter
should(10).eql(10)

/*eslint no-undef: 0*/
describe('Circle()', function () {
  it('takes a vec2 and radius', function () {
    var circle = new Circle(Vec2(0, 0), 10)
    circle.radius.should.eql(10)
  })
  it('takes an object and radius', function () {
    var circle = new Circle({x: 0, y: 0}, 10)
    circle.radius.should.eql(10)
  })
  it('takes an array and radius', function () {
    var circle = new Circle([0, 0], 10)
    circle.radius.should.eql(10)
  })
  it('has sane defaults', function () {
    var circle = new Circle()
    circle.position.should.eql(Vec2(0, 0))
    circle.radius.should.eql(1)
  })
  it('creates a Circle without the new keyword', function () {
    var circle = Circle(Vec2(1, 1))
    circle.position.should.eql(Vec2(1, 1))
  })
})

describe('containsPoint()', function () {
  it('returns true if passed point is inside', function () {
    var circle = new Circle(Vec2(0, 0), 10)
    circle.containsPoint(Vec2(0, 0)).should.be.true
  })
  it('returns true if passed point is on the boundary', function () {
    var circle = new Circle(Vec2(0, 0), 10)
    circle.containsPoint(Vec2(10, 0)).should.be.true
  })
  it('returns false if passed point is outside', function () {
    var circle = new Circle(Vec2(0, 0), 10)
    circle.containsPoint(Vec2(10, 10)).should.be.false
  })
  it('handles an array', function () {
    var circle = new Circle(Vec2(0, 0), 10)
    circle.containsPoint([10, 0]).should.be.true
    circle.containsPoint([10, 100]).should.be.false
  })
})

describe('intersectCircle()', function () {
  it('returns false when no intersections', function () {
    var c = Circle(Vec2(0, 0), 10)
    var c2 = Circle(Vec2(21, 0), 10)
    c.intersectCircle(c2).should.be.false
  })
  it('returns false when one circle is contained', function () {
    var c = Circle(Vec2(0, 0), 10)
    var c2 = Circle(Vec2(0, 0), 20)
    c.intersectCircle(c2).should.be.false
  })
  it('returns [] when same circles', function () {
    var c = Circle(Vec2(0, 0), 10)
    var c2 = Circle(Vec2(0, 0), 10)
    c.intersectCircle(c2).should.eql([])
  })
  it('returns [vec2] when intersects at one point', function () {
    var c = Circle(Vec2(0, 0), 10)
    var c2 = Circle(Vec2(20, 0), 10)
    c.intersectCircle(c2).equal(10, 0).should.be.true
  })
  it('returns [vec2, vec2] when intersects at two points', function () {
    var c = Circle(Vec2(0, 0), 10)
    var c2 = Circle(Vec2(10, 0), 10)
    var isect = c2.intersectCircle(c)

    isect.should.be.ok()
    isect.should.have.property('length', 2)

    isect.sort(function (a, b) {
      return a - b
    })

    isect[0].equal(5, -8.66025404).should.be.true
    isect[1].equal(5, 8.66025404).should.be.true
  })
})
