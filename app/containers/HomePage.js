// @flow
import React, { Component } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import PathSizeIndicator from '../components/PathSizeIndicator';
import Viz from '../components/Viz';
import getFolderSizes from '../src/filesizes/getFolderSizes';
import dir2tree from '../src/filesizes/dir2tree';
import { pathToStr } from '../utils/helpers';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

type Props = {};

// { a: { b: 1, c: 2, d: {dd: 22}}}, ['a, 'd'] => {d: {dd: 22}}
const lensView = (obj, lensPath) => {
  let current = JSON.parse(JSON.stringify(obj));
  const lastKey = lensPath[lensPath.length - 1];
  const keyPath = lensPath.slice(0, -1);
  for (let key of keyPath) {
    current = current[key].children;
  }

  for (let key of Object.keys(current)) {
    if (key !== lastKey) delete current[key];
  }

  return current;
};

export default class HomePage extends Component<Props> {
  props: Props;
  state = {
    currentPath: ['Users', 'rdkn'],
    viewing: { path: null, size: 0 },
    currentTreeData: null,
    loading: true
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = (depth = 3) => {
    getFolderSizes(pathToStr(this.state.currentPath), 3).then(data => {
      const treeData = dir2tree(data);
      this.setState({
        currentTreeData: lensView(treeData, this.state.currentPath),
        loading: false
      });
    });
  };

  handleHover = ({ size, path }) => {
    this.setState({
      viewing: {
        size,
        path
      }
    });
  };

  handleClick = ({ path, size }) => {
    const currentPath = [...this.state.currentPath.slice(0, -1), ...path];
    this.setState(
      {
        currentPath,
        loading: true
      },
      this.fetch
    );
  };

  breadClick = path => {
    this.setState(
      {
        currentPath: path,
        loading: true
      },
      this.fetch
    );
  };

  render() {
    const {
      viewing: { path, size },
      loading,
      currentTreeData,
      currentPath
    } = this.state;

    if (loading && !currentTreeData) {
      return 'Loading...';
    }

    const combinedPath = currentPath.slice(0, -1).concat(path || []);

    return (
      <>
        <div className="TopBar">
          {loading ? (
            'Loading...'
          ) : (
            <Breadcrumbs
              combinedPath={combinedPath}
              path={currentPath}
              onClick={this.breadClick}
            />
          )}
        </div>
        <div className="TopRightNav">
          <Link to={routes.SETTINGS}>&#x1f527;settings</Link>
        </div>
        <Viz
          data={currentTreeData}
          onHover={this.handleHover}
          onClick={this.handleClick}
        />
        <div className="BottomBar">
          <PathSizeIndicator path={combinedPath} size={size} />
        </div>
      </>
    );
  }
}
