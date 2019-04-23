// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// const { getFolderSizes } = require('./filesizes/getFolderSizes');
// const { pathEl } = require('./sunburst.js.js');

// const render = () => {
//   const info = document.getElementById('info');
//   const graph = document.getElementById('graph');
//   const myPath = pathEl([250, 250]);

//   info.innerHTML = 'Loading';

//   const data = localStorage.getItem('/Users/rdkn');
//   if (data) {
//     processData(JSON.parse(data));
//   } else {
//     getFolderSizes('/Users/rdkn', 1)
//       .then(processData)
//       .then(data => localStorage.setItem('/Users/rdkn', JSON.stringify(data)));
//   }
// };

const processData = data => {
  const [[_homePath, sum], ...level1] = data;

  // start from 12 o'clock
  let lastAngle = -Math.PI / 2;
  // change to relative size
  for (let pathsize of level1) {
    const relSize = (2 * Math.PI * pathsize[1]) / sum;

    graph.innerHTML += myPath(lastAngle, relSize + lastAngle, 20, 80, style(1));
    lastAngle += relSize;
  }

  return data;
};
// export {
//   pro
// }
