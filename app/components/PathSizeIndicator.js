import * as React from 'react';
import { pathToStr } from '../utils/helpers';
import filesize from 'filesize';

const PathSizeIndicator = ({ path, size }) =>
  `${pathToStr(path)} - ${filesize(size || 0, {
    base: 10
  })}`;

export default PathSizeIndicator;
