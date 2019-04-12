// {a: 1, 'class': 'big'} => 'a="1" class="big"'
const obj2param = o =>
  Object.entries(o).reduce((acc, next) => acc + `${next[0]}="${next[1]}" `, "");

module.exports = {
  obj2param
};
