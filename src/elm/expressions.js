const expression = require('./expression');
const aggregate = require('./aggregate');
const arithmetic = require('./arithmetic');
const clinical = require('./clinical');
const comparison = require('./comparison');
const conditional = require('./conditional');
const datetime = require('./datetime');
const declaration = require('./declaration');
const external = require('./external');
const instance = require('./instance');
const interval = require('./interval');
const list = require('./list');
const literal = require('./literal');
const logical = require('./logical');
const nullological = require('./nullological');
const parameters = require('./parameters');
const quantity = require('./quantity');
const query = require('./query');
const reusable = require('./reusable');
const string = require('./string');
const structured = require('./structured');
const type = require('./type');
const overloaded = require('./overloaded');

const libs = [expression, aggregate, arithmetic, clinical, comparison, conditional, datetime, declaration,
  external, instance, interval, list, literal, logical, nullological, parameters, query,quantity, reusable,
  string, structured, type, overloaded];
for (const lib of libs ) {
  for (const element of Object.keys(lib)) {
    module.exports[element] = lib[element];
  }
}
