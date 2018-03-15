/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let createQuantity, IncompatibleTypesException, Quantity;
const { Expression } = require('./expression');
const { FunctionRef } = require('./reusable');
const { decimalAdjust } = require('../util/math');
const { ValueSet, Code } = require('../datatypes/datatypes');
const { Exception } = require('../datatypes/exception');
const { build } = require('./builder');
const ucum = require('ucum');

module.exports.IncompatibleTypesException = (IncompatibleTypesException = (IncompatibleTypesException = class IncompatibleTypesException extends Exception {
  constructor(a , b , e) {
    {
      // Hack: trick Babel/TypeScript into allowing this before super.
      if (false) { super(); }
      let thisFn = (() => { this; }).toString();
      let thisName = thisFn.slice(thisFn.indexOf('{') + 1, thisFn.indexOf(';')).trim();
      eval(`${thisName} = this;`);
    }
    this.a = a;
    this.b = b;
    super(`Incompatible Types '${this.a}' and '${this.b}'`, e);
  }
}));

// Unit conversation is currently implemented on for time duration comparison operations
// TODO: Implement unit conversation for time duration mathematical operations
// TODO: Quantity should probably be available as a datatype (not just ELM expression)
module.exports.Quantity = (Quantity = class Quantity extends Expression {
  constructor(json) {
    super(...arguments);
    this.unit = json.unit;
    this.value = parseFloat(json.value);

    // Attempt to parse the unit with UCUM. If it fails, throw a friendly error.
    if (!is_valid_ucum_unit(this.unit)) {
      throw new Error(`\'${this.unit}\' is not a valid UCUM unit.`);
    }
  }

  clone() {
    return new Quantity({value: this.value, unit: this.unit});
  }

  exec(ctx) {
    return this;
  }

  toString() {
    return `${this.value} '${this.unit}'`;
  }

  sameOrBefore(other) {
    if (other instanceof Quantity) {
      const other_v = convert_value(other.value,ucum_unit(other.unit),ucum_unit(this.unit));
      return this.value <= other_v;
    }
  }

  sameOrAfter(other) {
    if (other instanceof Quantity) {
      const other_v = convert_value(other.value,ucum_unit(other.unit),ucum_unit(this.unit));
      return this.value >= other_v;
    }
  }

  after(other) {
    if (other instanceof Quantity) {
      const other_v = convert_value(other.value,ucum_unit(other.unit),ucum_unit(this.unit));
      return this.value > other_v;
    }
  }

  before(other) {
    if (other instanceof Quantity) {
      const other_v = convert_value(other.value,ucum_unit(other.unit),ucum_unit(this.unit));
      return this.value < other_v;
    }
  }

  equals(other) {
    if (other instanceof Quantity) {
      if ((!this.unit && other.unit ) || (this.unit && !other.unit)) {
        return false;
      } else if (!this.unit && !other.unit) {
        return this.value === other.value;
      } else {
        const other_v = convert_value(other.value,ucum_unit(other.unit),ucum_unit(this.unit));
        return decimalAdjust("round", this.value, -8)  === decimalAdjust("round", other_v, -8);
      }
    }
  }

  convertUnits(to_units) {
    return convert_value(this.value,this.unit,to_units);
  }

  dividedBy(other) {
    return this.multiplyDivide(other,"/");
  }

  multiplyBy(other) {
    return this.multiplyDivide(other,"."); // in ucum . represents multiplication
  }

  multiplyDivide(other, operator) {
    let unit, value;
    if (other instanceof Quantity) {
      if (this.unit && other.unit) {
        const can_val = this.to_ucum();
        const other_can_value = other.to_ucum();
        const ucum_value = ucum_multiply(can_val,[[operator,other_can_value]]);
        return createQuantity(ucum_value.value, units_to_string(ucum_value.units));
      } else {
        value = operator === "/" ? this.value / other.value  : this.value * other.value;
        unit = this.unit || other.unit;
        return createQuantity(decimalAdjust("round",value,-8), unit);
      }
    } else {
      value = operator === "/" ? this.value / other  : this.value * other;
      return createQuantity( decimalAdjust("round",value,-8), this.unit);
    }
  }

  to_ucum() {
    const u = ucum.parse(ucum_unit(this.unit));
    u.value *= this.value;
    return u;
  }
});

const clean_unit = function(units) {
  if (ucum_time_units[units]) { return ucum_to_cql_units[ucum_time_units[units]]; } else { return units; }
};

// Hash of time units and their UCUM equivalents, both case-sensitive and case-insensitive
// See http://unitsofmeasure.org/ucum.html#para-31
// The CQL specification says that dates are based on the Gregorian calendar
// UCUM says that years should be Julian. As a result, CQL-based year and month identifiers will
// be matched to the UCUM gregorian units. UCUM-based year and month identifiers will be matched
// to the UCUM julian units.
var ucum_time_units = {'years': 'a_g', 'year': 'a_g', 'YEARS': 'a_g', 'YEAR': 'a_g', 'a_g': 'a_g'
  , 'a': 'a_j', 'ANN': 'a_j', 'ann': 'a_j', 'A': 'a_j', 'a_j': 'a_j'
  , 'months': 'mo_g', 'month':'mo_g', 'mo_g': 'mo_g'
  , 'mo': 'mo_j', 'MO': 'mo_j', 'mo_j': 'mo_j'
  , 'weeks': 'wk', 'week': 'wk', 'wk': 'wk', 'WK': 'wk'
  , 'days': 'd', 'day':'d', 'd': 'd', 'D': 'd'
  , 'hours': 'h', 'hour': 'h', 'h': 'h', 'H': 'h'
  , 'minutes': 'min', 'minute': 'min', 'min': 'min', 'MIN': 'min'
  , 'seconds':'s', 'second':'s', 's': 's', 'S': 's'
  , 'milliseconds' : 'ms', 'millisecond' : 'ms', 'ms': 'ms', 'MS': 'ms'
  };

var ucum_to_cql_units = {
    'a_j':  'year'
  , 'a_g':  'year'
  , 'mo_j': 'month'
  , 'mo_g': 'month'
  , 'wk':   'week'
  , 'd':    'day'
  , 'h':    'hour'
  , 'min':  'minute'
  , 's':    'second'
  , 'ms':   'millisecond'
};
// this is used to perform any conversions of CQL date time fields to their ucum equivalents
var ucum_unit = unit => ucum_time_units[unit] || unit || '';

//just a wrapper function to deal with possible exceptions being thrown
var convert_value = function(value, from, to) {
  try {
    if (from === to) {
      return value;
    } else {
      return decimalAdjust("round", ucum.convert(value,ucum_unit(from),ucum_unit(to)), -8);
    }
  } catch (e) {
    throw new IncompatibleTypesException(from, to, e);
  }
};

// Cache for unit validity results so we dont have to go to ucum.js for every check.
// Is a map of unit string to boolean validity
const unitValidityCache = {};

// Helper for checking if a unit is valid. Checks the cache first, checks with ucum.js otherwise.
var is_valid_ucum_unit = function(unit) {
  if (unitValidityCache.hasOwnProperty(unit)) {
    return unitValidityCache[unit];
  } else {
    try {
      ucum.parse(ucum_unit(unit));
      unitValidityCache[unit] = true;
      return true;
    } catch (error) {
      unitValidityCache[unit] = false;
      return false;
    }
  }
};

module.exports.convert_value = convert_value;
// This method will take a ucum.js representation of units and convert them to a string
// ucum.js units are a has of unit => power values.  For instance m/h (meters per hour) in
// ucum.js will be reprsented by the json object {m: 1, h:-1}  negative values are inverted and
// are akin to denominator values in a fraction.  Positive values are somewhat a kin to numerator
// values in that they preceed the inverted values.  It is possible in ucum to have multiple non inverted
// or inverted values.  This method combines all of the non inverted values and appends them with
// the ucum multiplication operator '.' and then appends the inverted values separated by the ucum
// divisor '/' .
var units_to_string = function(units = {}) {
  const numer = [];
  const denom = [];
  for (let key of Object.keys(units)) {
    const v = units[key];
    const pow = Math.abs(v);
    const str = pow === 1 ? key  : key + pow;
    if (v < 0) { denom.push(str); } else { numer.push(str); }
  }
  let unit_string = "";
  unit_string += numer.join(".");
  if (denom.length > 0) {
    unit_string += `/${denom.join("/")}`;
  }
  if (unit_string === "") { return null; } else { return unit_string; }
};


// this method is taken from the ucum.js library which it does not  export
// so we need to replicate the behavior here in order to perform multiplication
// and division of the ucum values.
// t:  the ucum quantity being multiplied/divided .  This method modifies the object t that is passed in
// ms: an array of arrays whoes format is [<operator>,<ucum quantity>] an example would be [['.', {value: 1, units: {m:2}}]]
// this would represent multiply t by the value m^2
var ucum_multiply = function(t, ms=[]) {
  if (ms.length === 0) { return t; }
  const ret = t;
  for (let mterm of ms) {
    const sign = mterm[0] === '.' ? 1 : -1;
    const b = mterm[1];
    ret.value *= Math.pow(b.value,sign);
    for (let k in b.units) {
      const v = b.units[k];
      ret.units[k] = ret.units[k] || 0;
      ret.units[k] = ret.units[k] + (sign*v);
      if (ret.units[k] === 0) {
        delete ret.units[k];
      }
    }
  }
  return ret;
};

module.exports.createQuantity = (createQuantity = (value,unit) => new Quantity({value, unit}));

module.exports.parseQuantity = function(str) {
  const components = /([+|-]?\d+\.?\d*)\s*'(.+)'/.exec(str);
  if ((components != null) && (components[1] != null) && (components[2] != null)) {
    const value = parseFloat(components[1]);
    const unit = components[2].trim();
    return new Quantity({value, unit});
  } else {
    return null;
  }
};

module.exports.doAddition = function(a,b) {
  if (a instanceof Quantity && b instanceof Quantity) {
    // we will choose the unit of a to be the unit we return
    const val = convert_value(b.value, b.unit, a.unit);
    return new Quantity({unit: a.unit, value: a.value + val});
  } else {
    return __guardMethod__((typeof a.copy === 'function' ? a.copy() : undefined), 'add', o => o.add(b.value, clean_unit(b.unit)));
  }
};

module.exports.doSubtraction = function(a,b) {
  if (a instanceof Quantity && b instanceof Quantity) {
    const val = convert_value(b.value, b.unit, a.unit);
    return new Quantity({unit: a.unit, value: a.value - val});
  } else {
    return __guardMethod__((typeof a.copy === 'function' ? a.copy() : undefined), 'add', o => o.add(b.value * -1 , clean_unit(b.unit)));
  }
};


module.exports.doDivision = function(a,b) {
  if (a instanceof Quantity) {
    return a.dividedBy(b);
  }
};

module.exports.doMultiplication = function(a,b) {
  if (a instanceof Quantity) { return a.multiplyBy(b); } else { return b.multiplyBy(a); }
};

function __guardMethod__(obj, methodName, transform) {
  if (typeof obj !== 'undefined' && obj !== null && typeof obj[methodName] === 'function') {
    return transform(obj, methodName);
  } else {
    return undefined;
  }
}