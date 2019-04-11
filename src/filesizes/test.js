const R = require('ramda');
const { readFileSync } = require('fs');

const out = readFileSync('out.txt').toString();
const map = {
  '/Users/rdkn/.config': 32,
  '/Users/rdkn/Music': 128,
  '/Users/rdkn/.node-gyp': 7384,
  '/Users/rdkn/gh': 1794576,
  '/Users/rdkn/.thumbnails': 0,
  '/Users/rdkn/bin': 524296,
  '/Users/rdkn/Pictures': 8,
  '/Users/rdkn/.nvm': 159480,
  '/Users/rdkn/code': 503616,
  '/Users/rdkn/Desktop': 19464,
  '/Users/rdkn/Library': 21285456,
  '/Users/rdkn/Calibre Library': 79480,
  '/Users/rdkn/Public': 16,
  '/Users/rdkn/.dropbox': 120360,
  '/Users/rdkn/MEGA': 13938104,
  '/Users/rdkn/.ssh': 104,
  '/Users/rdkn/Movies': 0,
  '/Users/rdkn/Applications': 4416,
  '/Users/rdkn/MEGAsync': 0,
  '/Users/rdkn/Dropbox': 2680,
  '/Users/rdkn/.Trash': 25758016,
  '/Users/rdkn/.zoomus': 616,
  '/Users/rdkn/.npm': 212744,
  '/Users/rdkn/Documents': 1384,
  '/Users/rdkn/.vscode': 488888,
  '/Users/rdkn/.oh-my-zsh': 39472,
  '/Users/rdkn/Downloads': 33107976,
  '/Users/rdkn/.cache': 16,
  '/Users/rdkn/.zsh': 1416,
  '/Users/rdkn': 98050472
};

function folderSizes(duOutput){
  const re = /^(\d+?)\t(.+?)$/;
  const lines = duOutput.trim().split('\n')
  const map = {};
  for (let line of lines) {
    const [ _, foldersize, folderpath ] = line.match(re);
    map[folderpath] = Number(foldersize);
  }
  return map;
}

console.assert(R.equals(folderSizes(out), map))