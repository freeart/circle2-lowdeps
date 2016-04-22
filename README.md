## circle2-lowdeps

**all credits go to [tmpvar](https://github.com/tmpvar) and his [circle2](https://github.com/tmpvar/circle2) implementation**

## install

```
npm install circle2-lowdeps
```

## use


new __Circle__([origin [, radius])

Where `origin` adheres to the following form:

 * `[0, 1]`
 * `{ x: 0, y: 1}`
 * `new Vec2(0, 1)`

and `radius` is a number

_Note:_ the arguments to the `Circle` function are optional. If none are passed `circle.position` will be `0, 0` and `circle.radius` will be `1`

__containsPoint__(point)

Where `point` looks like one of the following:

 * `[0, 1]`
 * `{ x: 0, y: 1 }`
 * `new Vec2(0, 1)`

This function will return `true` if the passed point is inside or right on the boundary of the circle.

```javascript
var Circle = require('circle2');

var c = Circle()

console.log(c.contains([10, 0])) // false

c.radius(10);

console.log(c.contains([10, 0])); // true
```

__intersectCircle__(circle)

Performs an intersection between this circle and the incoming. Results are as follows:

 * `false` - no intersection or one circle is contained in the other
 * `[]` - same circles
 * `[Vec2]` - single intersection
 * `[Vec2, Vec2]` - two intersection points

__toSegments__([segments])

Convert this circle into a series of points representing the outline of this circle


### license

MIT (see: [LICENSE](blob/master/LICENSE))
