const { execFile } = require('child_process');

// default blocksize on macos
const BLOCKSIZE = 512;

function folderSizes(duOutput) {
  const re = /^(\d+?)\t(.+?)$/;
  const lines = duOutput.trim().split('\n');
  const map = {};
  for (let line of lines) {
    const [_, foldersize, folderpath] = line.match(re);
    map[folderpath] = Number(foldersize) * BLOCKSIZE;
  }
  return map;
}

const order = map => Object.entries(map).sort((a, b) => b[1] - a[1]);

const _getFolderSizes = (path, depth) =>
  new Promise((resolve, reject) => {
    execFile(
      'du',
      ['-d', depth.toString(), path],
      { env: { BLOCKSIZE } }, // ensure default blocksize
      (error, stdout, stderr) => {
        if (error) {
          console.error(error);
          if (!stdout) reject(error);
        }

        if (stderr) {
          console.error('stderr', stderr);
        }

        resolve(order(folderSizes(stdout)));
      }
    );
  });

const getFolderSizes = (path, depth, useCache = true) => {
  const storageKey = `${depth}\\${path}`;
  const data = localStorage.getItem(storageKey, `${depth}/${path}`);
  if (data && useCache) {
    return Promise.resolve(JSON.parse(data));
  } else {
    return _getFolderSizes(path, depth).then(data => {
      localStorage.setItem(storageKey, JSON.stringify(data));
      return data;
    });
  }
};

export default getFolderSizes;
