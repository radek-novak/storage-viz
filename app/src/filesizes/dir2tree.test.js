import dir2tree, { assignIn } from './dir2tree';

const input = [
  ['/a', 100],
  ['/a/a', 33],
  ['/a/b/c', 13],
  ['/a/b', 23],
  ['/b/', 230]
];

const output = {
  a: {
    // path: '/a',
    size: 100,
    children: {
      a: {
        // path: '/a/a',
        size: 33
      },
      b: {
        // path: '/a/b',
        size: 23,
        children: {
          c: {
            // path: '/a/b/c',
            size: 13
          }
        }
      }
    }
  },
  b: {
    // path: '/b',
    size: 230
  }
};

it('should build tree struct', () => {
  expect(dir2tree(input)).toEqual(output);
});

describe('assignIn suite', () => {
  it('should assign in simple', () => {
    const o = {};
    const expected = { a: { size: 1 } };
    const expected2 = { a: { size: 1, children: { b: { size: 2 } } } };
    const expected3 = {
      a: { size: 1, children: { b: { size: 2 } } },
      b: { size: 1 }
    };

    assignIn(o, ['a'], 1);
    expect(o).toEqual(expected);
    assignIn(o, ['a', 'b'], 2);
    expect(o).toEqual(expected2);
    assignIn(o, ['b'], 1);
    expect(o).toEqual(expected3);
  });

  it('should assign in deep', () => {
    const o = {};
    const expected = { a: { size: 1, children: { b: { size: 2 } } } };

    assignIn(o, ['a', 'b'], 2);
    expect(o).toEqual(expected);
  });

  it('should assign in complex obj', () => {
    const o = {
      a: {
        size: 2,
        children: {
          b: {
            size: 3,
            children: {
              d: {
                size: 2
              }
            }
          }
        }
      }
    };

    const expected = {
      a: {
        size: 2,
        children: {
          b: {
            size: 3,
            children: {
              d: {
                size: 2
              }
            }
          },
          c: {
            size: 33
          }
        }
      }
    };

    assignIn(o, ['a', 'c'], 33);

    expect(o).toEqual(expected);

    const expected2 = {
      a: {
        size: 2,
        children: {
          b: {
            size: 3,
            children: {
              d: {
                size: 2,
                children: {
                  dd: {
                    size: 34
                  }
                }
              }
            }
          },
          c: {
            size: 33
          }
        }
      }
    };
    assignIn(o, ['a', 'b', 'd', 'dd'], 34);
    expect(o).toEqual(expected2);
  });
});
