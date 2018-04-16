/* eslint-disable
    no-undef,
    no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let Abs, Add, Ceiling, Divide, Exp, Floor, Ln, Log, MaxValue, MinValue, Modulo, Multiply, Negate, Power, Predecessor, Round, Subtract, Successor, Truncate, TruncatedDivide;
const { Expression } = require('./expression');
const { typeIsArray , allTrue, anyTrue} = require('../util/util');
const { build } = require('./builder');
const MathUtil = require('../util/math');
const Quantity = require('./quantity');

module.exports.Add = (Add = class Add extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const args = this.execArgs(ctx);
    if ((args == null) || args.some(x => x == null)) {
      return null;
    } else {
      return (args != null ? args.reduce(function(x,y) {
        if (x.isQuantity || x.isDateTime) {
          return Quantity.doAddition(x,y);
        } else {
          return x + y;
        }
      }) : undefined);
    }
  }
});

module.exports.Subtract = (Subtract = class Subtract extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const args = this.execArgs(ctx);
    if ((args == null) || args.some(x => x == null)) {
      return null;
    } else {
      return args.reduce(function(x,y) {
        if (x.isQuantity || x.isDateTime) {
          return Quantity.doSubtraction(x,y);
        } else {
          return x - y;
        }
      });
    }
  }
});

module.exports.Multiply = (Multiply = class Multiply extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const args = this.execArgs(ctx);
    if ((args == null) || args.some(x => x == null)) {
      return null;
    } else {
      return (args != null ? args.reduce(function(x,y) {
        if (x.isQuantity || y.isQuantity) {
          return Quantity.doMultiplication(x,y);
        } else {
          return x * y;
        }
      }) : undefined);
    }
  }
});

module.exports.Divide = (Divide = class Divide extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const args = this.execArgs(ctx);
    if ((args == null) || args.some(x => x == null)) {
      return null;
    } else {
      return (args != null ? args.reduce(function(x,y) {
        if (x.isQuantity) {
          return Quantity.doDivision(x,y);
        } else {
          return x / y;
        }
      }) : undefined);
    }
  }
});

module.exports.TruncatedDivide = (TruncatedDivide = class TruncatedDivide extends  Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const args = this.execArgs(ctx);
    if ((args == null) || args.some(x => x == null)) {
      return null;
    } else {
      return Math.floor( args.reduce((x,y) => x / y));
    }
  }
});

module.exports.Modulo = (Modulo = class Modulo extends  Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const args = this.execArgs(ctx);
    if ((args == null) || args.some(x => x == null)) {
      return null;
    } else {
      return args.reduce((x,y) => x % y);
    }
  }
});

module.exports.Ceiling = (Ceiling = class Ceiling extends  Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if ((arg == null)) {
      return null;
    } else {
      return Math.ceil(arg);
    }
  }
});

module.exports.Floor = (Floor = class Floor extends  Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if ((arg == null)) {
      return null;
    } else {
      return Math.floor(arg);
    }
  }
});

module.exports.Truncate = (Truncate = class Truncate extends Floor {});

module.exports.Abs = (Abs = class Abs extends  Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if ((arg == null)) {
      return null;
    } else if (arg.isQuantity) {
      return Quantity.createQuantity( Math.abs(arg.value), arg.unit);
    } else {
      return Math.abs(arg);
    }
  }
});

module.exports.Negate = (Negate = class Negate extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if ((arg == null)) {
      return null;
    } else if (arg.isQuantity) {
      return Quantity.createQuantity(arg.value * -1, arg.unit);
    } else {
      return arg * -1;
    }
  }
});

module.exports.Round = (Round = class Round extends  Expression {
  constructor(json) {
    super(...arguments);
    this.precision = build(json.precision);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if ((arg == null)) {
      return null;
    } else {
      const dec = (this.precision != null) ? this.precision.execute(ctx) : 0;
      return Math.round(arg * Math.pow(10, dec)) / Math.pow(10, dec);
    }
  }
});

module.exports.Ln = (Ln = class Ln extends  Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if ((arg == null)) {
      return null;
    } else {
      return Math.log(arg);
    }
  }
});

module.exports.Exp = (Exp = class Exp extends  Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if ((arg == null)) {
      return null;
    } else {
      return Math.exp(arg);
    }
  }
});

module.exports.Log = (Log = class Log extends  Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const args = this.execArgs(ctx);
    if ((args == null) || args.some(x => x == null)) {
      return null;
    } else {
      return args.reduce((x,y) => Math.log(x)/Math.log(y));
    }
  }
});

module.exports.Power = (Power = class Power extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const args = this.execArgs(ctx);
    if ((args == null) || args.some(x => x == null)) {
      return null;
    } else {
      return args.reduce((x,y) => Math.pow(x , y));
    }
  }
});

module.exports.MinValue = (MinValue = (function() {
  MinValue = class MinValue extends Expression {
    static initClass() {
      this.prototype.MIN_VALUES = {'Integer' : MathUtil.MIN_INT_VALUE, 'Real' : MathUtil.MIN_FLOAT_VALUE, 'DateTime' : MathUtil.MIN_DATE_VALUE};
    }
    constructor(json) {
      super(...arguments);
    }

    exec(ctx) {
      const arg = this.execArgs(ctx);
      if ((arg == null)) {
        return null;
      } else {
        return MIN_VALUES[arg];
      }
    }
  };
  MinValue.initClass();
  return MinValue;
})());

module.exports.MaxValue = (MaxValue = (function() {
  MaxValue = class MaxValue extends Expression {
    static initClass() {
      this.prototype.MAX_VALUES = {'Integer' : MathUtil.MAX_INT_VALUE, 'Real' :MathUtil. MAX_FLOAT_VALUE, 'DateTime' : MathUtil.MAX_DATE_VALUE};
    }
    constructor(json) {
      super(...arguments);
    }

    exec(ctx) {
      const arg = this.execArgs(ctx);
      if ((arg == null)) {
        return null;
      } else {
        return MAX_VALUES[arg];
      }
    }
  };
  MaxValue.initClass();
  return MaxValue;
})());

module.exports.Successor = (Successor = class Successor extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if ((arg == null)) {
      return null;
    } else {
      return MathUtil.successor(arg);
    }
  }
});

module.exports.Predecessor = (Predecessor = class Predecessor extends  Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if ((arg == null)) {
      return null;
    } else {
      return MathUtil.predecessor(arg);
    }
  }
});
