// @flow
import * as React from 'react';
import Segment from './Segment';

const size = { w: 600, h: 600 };
const style = { maxHeight: '100vh', width: '100%' };

function Viz({ data, onHover, onClick }) {
  if (!data) return null;
  const treeData = data;
  const center = [size.w / 2, size.h / 2];
  const initialPath = Object.keys(treeData)[0];
  const initObj = treeData[initialPath];
  const initParams = {
    from: -Math.PI / 2,
    to: -Math.PI / 2 + 2 * Math.PI - 0.000001,
    level: 0,
    center
  };
  return (
    <svg style={style} viewBox={`0 0 ${size.w} ${size.h}`}>
      <Segment
        {...initParams}
        path={[initialPath]}
        segmentChildren={initObj.children}
        onHover={onHover}
        onClick={onClick}
      />
    </svg>
  );
}

export default React.memo(Viz);
