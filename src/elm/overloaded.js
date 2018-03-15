/* eslint-disable
    no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let After, ArrayIndexOutOfBoundsException, Contains, Equal, Equivalent, Except, In, IncludedIn, Includes, Indexer, Intersect, Length, NotEqual, ProperIncludedIn, ProperIncludes, Union;
const { Expression } = require('./expression');
const { IncompatibleTypesException } = require('./quantity');
const { ThreeValuedLogic } = require('../datatypes/logic');
const { DateTime } = require('../datatypes/datetime');
const { Exception } = require('../datatypes/exception');
const { typeIsArray } = require('../util/util');
const { equals, equivalent } = require('../util/comparison');
const { build } = require('./builder');
const DT = require('./datetime');
const LIST = require('./list');
const IVL = require('./interval');
const STRING = require('./string');

module.exports.Equal = (Equal = class Equal extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    try {
      return equals(...Array.from(this.execArgs(ctx) || []));
    } catch (error) {
      if (error instanceof IncompatibleTypesException) {
        return null;
      } else {
        throw error;
      }
    }
  }
});

module.exports.Equivalent = (Equivalent = class Equivalent extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const [a, b] = Array.from(this.execArgs(ctx));
    if ((a == null) && (b == null)) {
      return true;
    } else if ((a == null) || (b == null)) {
      return false;
    } else {
      return equivalent(a, b);
    }
  }
});

module.exports.NotEqual = (NotEqual = class NotEqual extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    try {
      return ThreeValuedLogic.not(equals(...Array.from(this.execArgs(ctx) || [])));
    } catch (error) {
      if (error instanceof IncompatibleTypesException) {
        return null;
      } else {
        throw error;
      }
    }
  }
});

module.exports.Union = (Union = class Union extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const [a, b] = Array.from(this.execArgs(ctx));
    if ((a == null) || (b == null)) { return null; }
    const lib = (() => { switch (false) {
    case !typeIsArray(a): return LIST;
    default: return IVL;
      } })();
    return lib.doUnion(a, b);
  }
});

module.exports.Except = (Except = class Except extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const [a, b] = Array.from(this.execArgs(ctx));
    if ((a == null) || (b == null)) { return null; }
    const lib = (() => { switch (false) {
    case !typeIsArray(a): return LIST;
    default: return IVL;
      } })();
    return lib.doExcept(a, b);
  }
});

module.exports.Intersect = (Intersect = class Intersect extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const [a, b] = Array.from(this.execArgs(ctx));
    if ((a == null) || (b == null)) { return null; }
    const lib = (() => { switch (false) {
    case !typeIsArray(a): return LIST;
    default: return IVL;
      } })();
    return lib.doIntersect(a, b);
  }
});

module.exports.ArrayIndexOutOfBoundsException = (ArrayIndexOutOfBoundsException = (ArrayIndexOutOfBoundsException = class ArrayIndexOutOfBoundsException extends Exception {}));

module.exports.Indexer = (Indexer = class Indexer extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const [operand, index] = Array.from(this.execArgs(ctx));
    if ((operand == null) || (index == null)) { return null; }
    if ((index < 0) || (index >= operand.length)) { throw new ArrayIndexOutOfBoundsException(); }
    return operand[index];
  }
});

module.exports.In = (In = class In extends Expression {
  constructor(json) {
    super(...arguments);
    this.precision = json.precision != null ? json.precision.toLowerCase() : undefined;
  }

  exec(ctx) {
    const [item, container] = Array.from(this.execArgs(ctx));
    if ((item == null) || (container == null)) { return null; }
    const lib = (() => { switch (false) {
    case !typeIsArray(container): return LIST;
    default: return IVL;
      } })();
    return lib.doContains(container, item, this.precision);
  }
});

module.exports.Contains = (Contains = class Contains extends Expression {
  constructor(json) {
    super(...arguments);
    this.precision = json.precision != null ? json.precision.toLowerCase() : undefined;
  }

  exec(ctx) {
    const [container, item] = Array.from(this.execArgs(ctx));
    if ((item == null) || (container == null)) { return null; }
    const lib = (() => { switch (false) {
    case !typeIsArray(container): return LIST;
    default: return IVL;
      } })();
    return lib.doContains(container, item, this.precision);
  }
});

module.exports.Includes = (Includes = class Includes extends Expression {
  constructor(json) {
    super(...arguments);
    this.precision = json.precision != null ? json.precision.toLowerCase() : undefined;
  }

  exec(ctx) {
    const [container, contained] = Array.from(this.execArgs(ctx));
    if ((container == null) || (contained == null)) { return null; }
    const lib = (() => { switch (false) {
    case !typeIsArray(container): return LIST;
    default: return IVL;
      } })();
    return lib.doIncludes(container, contained, this.precision);
  }
});

module.exports.IncludedIn = (IncludedIn = class IncludedIn extends Expression {
  constructor(json) {
    super(...arguments);
    this.precision = json.precision != null ? json.precision.toLowerCase() : undefined;
  }

  exec(ctx) {
    const [contained, container] = Array.from(this.execArgs(ctx));
    if ((container == null) || (contained == null)) { return null; }
    const lib = (() => { switch (false) {
    case !typeIsArray(container): return LIST;
    default: return IVL;
      } })();
    return lib.doIncludes(container, contained, this.precision);
  }
});

module.exports.ProperIncludes = (ProperIncludes = class ProperIncludes extends Expression {
  constructor(json) {
    super(...arguments);
    this.precision = json.precision != null ? json.precision.toLowerCase() : undefined;
  }

  exec(ctx) {
    const [container, contained] = Array.from(this.execArgs(ctx));
    if ((container == null) || (contained == null)) { return null; }
    const lib = (() => { switch (false) {
    case !typeIsArray(container): return LIST;
    default: return IVL;
      } })();
    return lib.doProperIncludes(container, contained, this.precision);
  }
});

module.exports.ProperIncludedIn = (ProperIncludedIn = class ProperIncludedIn extends Expression {
  constructor(json) {
    super(...arguments);
    this.precision = json.precision != null ? json.precision.toLowerCase() : undefined;
  }

  exec(ctx) {
    const [contained, container] = Array.from(this.execArgs(ctx));
    if ((container == null) || (contained == null)) { return null; }
    const lib = (() => { switch (false) {
    case !typeIsArray(container): return LIST;
    default: return IVL;
      } })();
    return lib.doProperIncludes(container, contained, this.precision);
  }
});

module.exports.Length = (Length = class Length extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if (arg != null) { return arg.length; } else { return null; }
  }
});

module.exports.After = (After = class After extends Expression {
  constructor(json) {
    super(...arguments);
    this.precision = json.precision != null ? json.precision.toLowerCase() : undefined;
  }

  exec(ctx) {
    const [a, b] = Array.from(this.execArgs(ctx));
    if ((a == null) || (b == null)) { return null; }
    const lib = (() => { switch (false) {
    case !(a instanceof DateTime): return DT;
    default: return IVL;
      } })();
    return lib.doAfter(a, b, this.precision);
  }
});

module.exports.Before = (After = class After extends Expression {
  constructor(json) {
    super(...arguments);
    this.precision = json.precision != null ? json.precision.toLowerCase() : undefined;
  }

  exec(ctx) {
    const [a, b] = Array.from(this.execArgs(ctx));
    if ((a == null) || (b == null)) { return null; }
    const lib = (() => { switch (false) {
    case !(a instanceof DateTime): return DT;
    default: return IVL;
      } })();
    return lib.doBefore(a, b, this.precision);
  }
});
