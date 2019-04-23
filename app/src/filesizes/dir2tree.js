// @flow

const getSlashesCount = str =>
  str.split('').reduce((acc, curr) => (curr === '/' ? acc + 1 : acc), 0);

const assignIn = (obj, path, size) => {
  const curPathSect = path[0];
  const [_head, ...tail] = path;

  if (curPathSect in obj) {
    obj[curPathSect].children = obj[curPathSect].children || {};

    if (path.length === 1) {
      obj.children[curPathSect] = { size };
    } else {
      assignIn(obj[curPathSect].children, tail, size);
    }
  } else {
    if (path.length === 1) {
      obj[curPathSect] = { size };
    } else {
      obj[curPathSect] = {
        size: 1,
        children: {}
      };
      assignIn(obj[curPathSect].children, tail, size);
    }
  }
};

const dir2tree = inputArg => {
  let input = [...inputArg];
  // rm trailing slash
  input = input.map(el => [
    el[0].replace(/^(.+?)\/$/, (_match, g1) => g1),
    el[1]
  ]);

  const result = {};

  let level = 1;
  while (input.length) {
    const current = input.filter(([path]) => getSlashesCount(path) === level);

    for (let cur of current) {
      const [path, size] = cur;
      const pathArr = path.split('/').filter(Boolean);
      assignIn(result, pathArr, size);
    }

    input = input.filter(([path]) => getSlashesCount(path) !== level);
    level++;
  }

  return result;
};

export default dir2tree;
export { assignIn };
