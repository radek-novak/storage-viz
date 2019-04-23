const { obj2param } = require('./helpers');

const polarToCartesian = ([cx, cy]) => polarCoord => [
  Math.cos(polarCoord.angle) * polarCoord.distance + cx,
  Math.sin(polarCoord.angle) * polarCoord.distance + cy
];
const mag = ([cx, cy]) => ([x, y]) => Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);

const pathEl = center => (angFrom, angTo, distNear, distFar, params = {}) => {
  const p2c = polarToCartesian(center);
  const m2c = mag(center);
  const a = p2c({ angle: angFrom, distance: distFar });
  const b = p2c({ angle: angTo, distance: distFar });
  const c = p2c({ angle: angTo, distance: distNear });
  const d = p2c({ angle: angFrom, distance: distNear });
  const r1 = m2c(a);
  const r2 = m2c(c);
  const isOverPi = Number(Math.abs(angFrom - angTo) > Math.PI); // 1 or 0

  return `
    <path d="
      M${a[0]},${a[1]}
      A${r1},${r1},0,${isOverPi},1,${b[0]}, ${b[1]}
      L${c[0]},${c[1]}
      A${r2},${r2},0,${isOverPi},0,${d[0]},${d[1]}
      Z
    "
    ${obj2param(params)}/>
  `;
};

module.exports = {
  pathEl
};

export { polarToCartesian, mag };
// const coord = { angle: Math.PI / 2, distance: 20 };
// const center = [50, 50];

// const svgEl = document.getElementById('gen');
// svgEl.innerHTML = pathEl(center)(Math.PI/3, Math.PI + 3.5, 15, 30)
