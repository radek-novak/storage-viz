const { execFile } = require("child_process");

function folderSizes(duOutput) {
  const re = /^(\d+?)\t(.+?)$/;
  const lines = duOutput.trim().split("\n");
  const map = {};
  for (let line of lines) {
    const [_, foldersize, folderpath] = line.match(re);
    map[folderpath] = Number(foldersize);
  }
  return map;
}

const order = map => Object.entries(map).sort((a, b) => b[1] - a[1]);

const getFolderSizes = (path, depth) =>
  new Promise((resolve, reject) => {
    execFile("du", ["-d", depth.toString(), path], (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        // throw error;
        if (!stdout) reject(error);
      }

      if (stderr) {
        console.error("stderr", stderr);
      }

      resolve(order(folderSizes(stdout)));
    });
  });

module.exports = {
  getFolderSizes
};
