/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let Greater, GreaterOrEqual, Less, LessOrEqual;
const { Expression } = require('./expression');
const { Uncertainty } = require('../datatypes/datatypes');
const { IncompatibleTypesException } = require('./quantity');

// Equal is completely handled by overloaded#Equal

// NotEqual is completely handled by overloaded#Equal

module.exports.Less = (Less = class Less extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const args = this.execArgs(ctx).map(x => Uncertainty.from(x));
    try {
      return args[0].lessThan(args[1]);
    } catch (error) {
      if (error instanceof IncompatibleTypesException) {
        return null;
      } else {
        throw error;
      }
    }
  }
});

module.exports.LessOrEqual = (LessOrEqual = class LessOrEqual extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const args = this.execArgs(ctx).map(x => Uncertainty.from(x));
    try {
      return args[0].lessThanOrEquals(args[1]);
    } catch (error) {
      if (error instanceof IncompatibleTypesException) {
        return null;
      } else {
        throw error;
      }
    }
  }
});

module.exports.Greater = (Greater = class Greater extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const args = this.execArgs(ctx).map(x => Uncertainty.from(x));
    try {
      return args[0].greaterThan(args[1]);
    } catch (error) {
      if (error instanceof IncompatibleTypesException) {
        return null;
      } else {
        throw error;
      }
    }
  }
});

module.exports.GreaterOrEqual = (GreaterOrEqual = class GreaterOrEqual extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const args = this.execArgs(ctx).map(x => Uncertainty.from(x));
    try {
      return args[0].greaterThanOrEquals(args[1]);
    } catch (error) {
      if (error instanceof IncompatibleTypesException) {
        return null;
      } else {
        throw error;
      }
    }
  }
});
