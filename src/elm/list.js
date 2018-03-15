/* eslint-disable
    no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS104: Avoid inline assignments
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let Current, Distinct, doContains, doIncludes, Exists, Filter, First, Flatten, ForEach, IndexOf, Last, List, SingletonFrom, Times, ToList;
const { Expression, UnimplementedExpression } = require('./expression');
const { ValueSet } = require('../datatypes/datatypes');
const { build } = require('./builder');
const { typeIsArray } = require('../util/util');
const { equals, equivalent } = require('../util/comparison');

module.exports.List = (List = class List extends Expression {
  constructor(json) {
    let left;
    super(...arguments);
    this.elements = ((left = build(json.element))) != null ? left : [];
  }

  exec(ctx) {
    return (this.elements.map((item) => item.execute(ctx)));
  }
});

module.exports.Exists = (Exists = class Exists extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    return __guard__(this.execArgs(ctx), x => x.length) > 0;
  }
});

// Equal is completely handled by overloaded#Equal

// NotEqual is completely handled by overloaded#Equal

// Delegated to by overloaded#Union
module.exports.doUnion = (a, b) => doDistinct(a.concat(b));

// Delegated to by overloaded#Except
module.exports.doExcept = (a, b) =>
  (() => {
    const result = [];
    for (let itm of a) {       if (!doContains(b, itm)) {
      result.push(itm);
    }
    }
    return result;
  })()
;

// Delegated to by overloaded#Intersect
module.exports.doIntersect = (a, b) =>
  (() => {
    const result = [];
    for (let itm of a) {       if (doContains(b, itm)) {
      result.push(itm);
    }
    }
    return result;
  })()
;

// ELM-only, not a product of CQL
module.exports.Times = (Times = class Times extends UnimplementedExpression {});

// ELM-only, not a product of CQL
module.exports.Filter = (Filter = class Filter extends UnimplementedExpression {});

module.exports.SingletonFrom = (SingletonFrom = class SingletonFrom extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if ((arg != null) && (arg.length > 1)) { throw new Error('IllegalArgument: \'SingletonFrom\' requires a 0 or 1 arg array');
    } else if ((arg != null) && (arg.length === 1)) { return arg[0];
    } else { return null; }
  }
});

module.exports.ToList = (ToList = class ToList extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if (arg != null) {
      return [arg];
    } else {
      return [];
    }
  }
});

module.exports.IndexOf = (IndexOf = class IndexOf extends Expression {
  constructor(json) {
    super(...arguments);
    this.source = build(json.source);
    this.element = build(json.element);
  }

  exec(ctx) {
    let index;
    const src = this.source.exec(ctx);
    const el = this.element.exec(ctx);
    if ((src == null) || (el == null)) { return null; }
    for (let i = 0; i < src.length; i++) { const itm = src[i]; if (equals(itm, el)) { index = i; break; } }
    if (index != null) { return index; } else { return -1; }
  }
});

// Indexer is completely handled by overloaded#Indexer

// Delegated to by overloaded#Contains and overloaded#In
module.exports.doContains = (doContains = function(container, item) {
  for (let element of container) { if (equivalent(element, item)) { return true; } }
  return false;
});

// Delegated to by overloaded#Includes and overloaded@IncludedIn
module.exports.doIncludes = (doIncludes = (list, sublist) => sublist.every(x => doContains(list, x)));

// Delegated to by overloaded#ProperIncludes and overloaded@ProperIncludedIn
module.exports.doProperIncludes = (list, sublist) => (list.length > sublist.length) && doIncludes(list, sublist);

// ELM-only, not a product of CQL
module.exports.ForEach = (ForEach = class ForEach extends UnimplementedExpression {});

module.exports.Flatten = (Flatten = class Flatten extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if (typeIsArray(arg) && (arg.every(x => typeIsArray(x)))) {
      return arg.reduce(((x, y) => x.concat(y)), []);
    } else {
      return arg;
    }
  }
});

module.exports.Distinct = (Distinct = class Distinct extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    return doDistinct(this.execArgs(ctx));
  }
});

var doDistinct = function(list) {
  const seen = [];
  return list.filter(function(item) {
    const isNew = seen.every(seenItem => !equals(item, seenItem));
    if (isNew) { seen.push(item); }
    return isNew;
  });
};

// ELM-only, not a product of CQL
module.exports.Current = (Current = class Current extends UnimplementedExpression {});

module.exports.First = (First = class First extends Expression {
  constructor(json) {
    super(...arguments);
    this.source = build(json.source);
  }

  exec(ctx) {
    const src = this.source.exec(ctx);
    if ((src != null) && typeIsArray(src) && (src.length > 0)) { return src[0]; } else { return null; }
  }
});

module.exports.Last = (Last = class Last extends Expression {
  constructor(json) {
    super(...arguments);
    this.source = build(json.source);
  }

  exec(ctx) {
    const src = this.source.exec(ctx);
    if ((src != null) && typeIsArray(src) && (src.length > 0)) { return src[src.length-1]; } else { return null; }
  }
});

// Length is completely handled by overloaded#Length

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}