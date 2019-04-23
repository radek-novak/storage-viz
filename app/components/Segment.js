import * as React from 'react';
import { polarToCartesian, mag } from '../utils/helpers';

const pathEl = center => (angFrom, angTo, distNear, distFar) => {
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
    M${a[0]},${a[1]}
    A${r1},${r1},0,${isOverPi},1,${b[0]}, ${b[1]}
    L${c[0]},${c[1]}
    A${r2},${r2},0,${isOverPi},0,${d[0]},${d[1]}
    Z
    `;
};
const textPath = center => (angFrom, angTo, distFar) => {
  const p2c = polarToCartesian(center);
  const m2c = mag(center);
  const a = p2c({ angle: angFrom, distance: distFar });
  const b = p2c({ angle: angTo, distance: distFar });
  const r1 = m2c(a);
  const isOverPi = Number(Math.abs(angFrom - angTo) > Math.PI); // 1 or 0
  return `
    M${a[0]},${a[1]}
    A${r1},${r1},0,${isOverPi},1,${b[0]}, ${b[1]}
    `;
};

const renderChildren = ({
  from,
  to,
  level,
  path,
  onHover,
  onClick,
  center,
  segmentChildren
}) => {
  if (!segmentChildren) return [];

  const ret = [];
  const entries = Object.entries(segmentChildren);
  const sum = entries.reduce((acc, [key, value]) => value.size + acc, 0);

  const angleSpan = to - from;
  let lastAngle = from;

  for (let [key, { size, children }] of entries) {
    const relSize = (angleSpan * size) / sum;

    if (typeof relSize !== 'number' || isNaN(relSize)) continue;
    const newPath = path.concat(key);

    ret.push(
      <Segment
        key={newPath.join('/')}
        from={lastAngle}
        to={lastAngle + relSize}
        path={newPath}
        size={size}
        level={level + 1}
        center={center}
        onHover={onHover}
        onClick={onClick}
        segmentChildren={children}
      />
    );
    lastAngle += relSize;
  }

  return ret;
};

function Segment({
  from,
  to,
  level,
  path,
  onHover,
  onClick,
  size,
  center,
  segmentChildren
}) {
  const centeredPath = pathEl(center);
  const centeredTextPath = textPath(center);
  const textPathId = path.join('/');
  const lastFolder = path[path.length - 1];

  return (
    <>
      <defs>
        <path id={textPathId} d={centeredTextPath(from, to, 50 * level + 25)} />
      </defs>

      <path
        d={centeredPath(from, to, 50 * level + 5, 50 * (level + 1))}
        className="Segment__path"
        onMouseOver={() => onHover({ size, path })}
        onClick={() => onClick({ size, path })}
      />
      <text className="u-noPointerEv">
        <textPath startOffset="10" side="right" href={'#' + textPathId}>
          {lastFolder}
        </textPath>
      </text>
      {renderChildren({
        from,
        to,
        level,
        onHover,
        onClick,
        center,
        path,
        segmentChildren
      })}
    </>
  );
}

export default React.memo(Segment);
