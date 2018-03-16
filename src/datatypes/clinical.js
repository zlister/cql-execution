const { typeIsArray } = require('../util/util');

class Code {
  constructor(code, system, version, display) {
    this.code = code;
    this.system = system;
    this.version = version;
    this.display = display;
  }

  hasMatch(code) {
    return codesInList(toCodeList(code), [this]);
  }
}

class Concept {
  constructor(codes = [], display) {
    this.codes = codes;
    this.display = display;
  }

  hasMatch(code) {
    return codesInList(toCodeList(code), this.codes);
  }
}

class ValueSet {
  constructor(oid, version, codes = []) {
    this.oid = oid;
    this.version = version;
    this.codes = codes;
  }

  hasMatch(code) {
    return codesInList(toCodeList(code), this.codes);
  }
}

function toCodeList(c) {
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
}

function codesInList(cl1, cl2) {
  return cl1.some(c1 => cl2.some(c2 => codesMatch(c1, c2)));
}

function codesMatch(code1, code2) {
  if (code1.code !== code2.code) { return false; }
  if ((code1.system != null) && (code2.system != null) && (code1.system !== code2.system)) { return false; }
  return true;
}

class CodeSystem {
  constructor(id, version) {
    this.id = id;
    this.version = version;
  }
}

module.exports = { Code, CodeSystem, Concept, ValueSet };