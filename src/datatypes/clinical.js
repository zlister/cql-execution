/* eslint-disable
    no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let Code, CodeSystem, Concept, ValueSet;
const { typeIsArray } = require('../util/util');

module.exports.Code = (Code = class Code {
  constructor(code, system, version, display) {
    this.code = code;
    this.system = system;
    this.version = version;
    this.display = display;
  }

  hasMatch(code) {
    return codesInList(toCodeList(code), [this]);
  }
});

module.exports.Concept = (Concept = class Concept {
  constructor(codes = [], display) {
    this.codes = codes;
    this.display = display;
  }

  hasMatch(code) {
    return codesInList(toCodeList(code), this.codes);
  }
});

module.exports.ValueSet = (ValueSet = class ValueSet {
  constructor(oid, version, codes = []) {
    this.oid = oid;
    this.version = version;
    this.codes = codes;
  }

  hasMatch(code) {
    return codesInList(toCodeList(code), this.codes);
  }
});

var toCodeList = function(c) {
  if ((c == null)) {
    return [];
  } else if (typeIsArray(c)) {
    let list = [];
    for (let c2 of c) {
      list = list.concat(toCodeList(c2));
    }
    return list;
  } else if (typeIsArray(c.codes)) {
    return c.codes;
  } else if (typeof c === 'string') {
    return [new Code(c)];
  } else {
    return [c];
  }
};


var codesInList = (cl1, cl2) => cl1.some(c1 => cl2.some(c2 => codesMatch(c1, c2)));

var codesMatch = function(code1, code2) {
  if (code1.code !== code2.code) { return false; }
  if ((code1.system != null) && (code2.system != null) && (code1.system !== code2.system)) { return false; }
  return true;
};

module.exports.CodeSystem = (CodeSystem = class CodeSystem {
  constructor(id, version) {
    this.id = id;
    this.version = version;
  }
});
