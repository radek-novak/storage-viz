import * as React from 'react';

const Breadcrumbs = ({ path, combinedPath, onClick }) =>
  path.map((segment, i) => {
    const slicePath = combinedPath.slice(0, i + 1);

    return (
      <button
        className="Bread__btn"
        key={i + slicePath.join('^')}
        onClick={() => onClick(slicePath)}
      >
        /{segment}
      </button>
    );
  });

export default Breadcrumbs;
