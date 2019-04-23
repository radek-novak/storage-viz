// {a: 1, 'class': 'big'} => 'a="1" class="big"'
const obj2param = o =>
  Object.entries(o).reduce((acc, next) => acc + `${next[0]}="${next[1]}" `, '');

const polarToCartesian = ([cx, cy]) => polarCoord => [
  Math.cos(polarCoord.angle) * polarCoord.distance + cx,
  Math.sin(polarCoord.angle) * polarCoord.distance + cy
];
const mag = ([cx, cy]) => ([x, y]) => Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
const pathToStr = path => `/${path.join('/')}`;

export { obj2param, polarToCartesian, mag, pathToStr };
