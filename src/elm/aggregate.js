/* eslint-disable
    no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let AllTrue, AnyTrue, Avg, Count, Max, Median, Min, Mode, PopulationStdDev, PopulationVariance, StdDev, Sum, Variance;
const { Expression } = require('./expression');
const { typeIsArray , allTrue, anyTrue, compact, numerical_sort} = require('../util/util');
const { build } = require('./builder');
const { Exception } = require('../datatypes/exception');
const Quantity = require('./quantity');

const quantitiesOrArg = function(arr) {
  arr = compact(arr);
  // short curcuit empty arrays and return
  if (arr.length === 0) {
    return arr;
  }

  const allQs = arr.every(x => x.isQuantity);
  const someQs = arr.some(x => x.isQuantity);
  if (allQs) {
    const { unit } = arr[0];
    const values = [];
    for (let i of arr) {
      values.push(i.convertUnits(unit));
    }
    return values;
  } else if (someQs) {
    throw new Exception('Cannot perform aggregate operations on mixed values of Quantities and non Quantities');
  } else {
    return arr;
  }
};

const quantityOrValue = function(value, arr) {
  // we used the first unit in the list to convert to so that is what
  // we will use as a unit for quantities
  if (__guard__(arr != null ? arr[0] : undefined, x => x.unit)) {
    return Quantity.createQuantity(value, arr[0].unit);
  } else {
    return value;
  }
};

class AggregateExpression extends Expression {
  constructor(json) {
    super(...arguments);
    this.source = build(json.source);
  }
}

module.exports.Count = (Count = class Count extends AggregateExpression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.source.execute(ctx);
    if (typeIsArray(arg)) {
      return compact(arg).length;
    }
  }
});

module.exports.Sum = (Sum = class Sum extends AggregateExpression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.source.execute(ctx);
    if (typeIsArray(arg)) {
      const filtered =  quantitiesOrArg(arg);
      const val = filtered.length === 0 ? null : filtered.reduce((x,y) => x+y);
      return quantityOrValue(val, arg);
    }
  }
});


module.exports.Min = (Min = class Min extends AggregateExpression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.source.execute(ctx);
    if (typeIsArray(arg)) {
      const filtered =  numerical_sort(quantitiesOrArg(arg),'asc');
      return quantityOrValue(filtered[0],arg);
    }
  }
});

module.exports.Max = (Max = class Max extends AggregateExpression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.source.execute(ctx);
    if (typeIsArray(arg)) {
      const filtered =  numerical_sort(quantitiesOrArg(arg),'desc');
      return quantityOrValue(filtered[0],arg);
    }
  }
});

module.exports.Avg = (Avg = class Avg extends  AggregateExpression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.source.execute(ctx);
    if (typeIsArray(arg)) {
      const filtered = quantitiesOrArg(arg);
      if (filtered.length === 0) { return null; }
      const sum = filtered.reduce((x,y) => x+y);
      return quantityOrValue((sum / filtered.length),arg);
    }
  }
});

module.exports.Median = (Median = class Median extends AggregateExpression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.source.execute(ctx);
    if (typeIsArray(arg)) {
      const filtered =  numerical_sort(quantitiesOrArg(arg),'asc');
      if (filtered.length === 0) {
        return null;
      } else if ((filtered.length % 2) === 1) {
        return quantityOrValue(filtered[(filtered.length - 1) / 2],arg);
      } else {
        const v = (filtered[(filtered.length / 2) - 1] +
         filtered[(filtered.length / 2)]) / 2;
        return quantityOrValue(v,arg);
      }
    }
  }
});

module.exports.Mode = (Mode = class Mode extends AggregateExpression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.source.execute(ctx);
    if (typeIsArray(arg)) {
      const filtered = compact(arg);
      const mode = this.mode(filtered);
      if (mode.length === 1) { return mode[0]; } else { return mode; }
    }
  }

  mode(arr) {
    let max = 0;
    const counts = {};
    let results = [];
    for (let elem of arr) {
      const cnt = (counts[elem] = (counts[elem] != null ? counts[elem] : 0) + 1);
      if ((cnt === max) && !results.includes(elem)) {
        results.push(elem);
      } else if (cnt > max) {
        results = [elem];
        max = cnt;
      }
    }
    return results;
  }
});

module.exports.StdDev = (StdDev = class StdDev extends AggregateExpression {

  constructor(json) {
    super(...arguments);
    this.type = 'standard_deviation';
  }

  exec(ctx) {
    const args = this.source.execute(ctx);
    if (typeIsArray(args)) {
      const val = quantitiesOrArg(args);
      if (val.length > 0) { return quantityOrValue(this.calculate(val),args);  } else { return null; }
    }
  }

  calculate(list) {
    const val = this.stats(list);
    if (val) { return val[this.type]; }
  }

  stats(list) {
    const sum = list.reduce((x,y) => x+y);
    const mean = sum / list.length;
    let sumOfSquares = 0;

    for (let sq of list) {
      sumOfSquares += Math.pow((sq - mean),2);
    }

    const std_var = (1/list.length) * sumOfSquares;
    const pop_var = (1/(list.length-1)) * sumOfSquares;
    const std_dev = Math.sqrt(std_var);
    const pop_dev = Math.sqrt(pop_var);
    return {standard_variance: std_var, population_variance: pop_var, standard_deviation: std_dev, population_deviation: pop_dev};
  }
});

module.exports.PopulationStdDev = (PopulationStdDev = class PopulationStdDev extends StdDev {
  constructor(json) {
    super(...arguments);
    this.type = 'population_deviation';
  }
});

module.exports.Variance = (Variance = class Variance extends  StdDev {
  constructor(json) {
    super(...arguments);
    this.type = 'standard_variance';
  }
});

module.exports.PopulationVariance = (PopulationVariance = class PopulationVariance extends  StdDev {
  constructor(json) {
    super(...arguments);
    this.type = 'population_variance';
  }
});

module.exports.AllTrue = (AllTrue = class AllTrue extends AggregateExpression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const args =this.source.execute(ctx);
    return allTrue(args);
  }
});

module.exports.AnyTrue = (AnyTrue = class AnyTrue extends AggregateExpression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const args = this.source.execute(ctx);
    return anyTrue(args);
  }
});

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}