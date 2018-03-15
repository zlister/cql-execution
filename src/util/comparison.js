/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let equals, equivalent;
const { DateTime } = require('../datatypes/datetime');
const { Uncertainty } = require('../datatypes/uncertainty');

const areNumbers = (a, b) => (typeof a === 'number') && (typeof b === 'number');

const areDateTimesOrQuantities = (a, b) => (a instanceof DateTime && b instanceof DateTime) || ((__guard__(a != null ? a.constructor : undefined, x => x.name) === 'Quantity') && (__guard__(b != null ? b.constructor : undefined, x1 => x1.name) === 'Quantity'));

const isUncertainty = x => x instanceof Uncertainty;

module.exports.lessThan = function(a, b, precision = DateTime.Unit.MILLISECOND) {
  switch (false) {
    case !areNumbers(a, b): return a < b;
    case !areDateTimesOrQuantities(a, b): return a.before(b, precision);
    case !isUncertainty(a): return a.lessThan(b);
    case !isUncertainty(b): return Uncertainty.from(a).lessThan(b);
    default: return null;
  }
};

module.exports.lessThanOrEquals = function(a, b, precision = DateTime.Unit.MILLISECOND) {
  switch (false) {
    case !areNumbers(a, b): return a <= b;
    case !areDateTimesOrQuantities(a, b): return a.sameOrBefore(b, precision);
    case !isUncertainty(a): return a.lessThanOrEquals(b);
    case !isUncertainty(b): return Uncertainty.from(a).lessThanOrEquals(b);
    default: return null;
  }
};

module.exports.greaterThan = function(a, b, precision = DateTime.Unit.MILLISECOND) {
  switch (false) {
    case !areNumbers(a, b): return a > b;
    case !areDateTimesOrQuantities(a, b): return a.after(b, precision);
    case !isUncertainty(a): return a.greaterThan(b);
    case !isUncertainty(b): return Uncertainty.from(a).greaterThan(b);
    default: return null;
  }
};

module.exports.greaterThanOrEquals = function(a, b, precision = DateTime.Unit.MILLISECOND) {
  switch (false) {
    case !areNumbers(a, b): return a >= b;
    case !areDateTimesOrQuantities(a, b): return a.sameOrAfter(b, precision);
    case !isUncertainty(a): return a.greaterThanOrEquals(b);
    case !isUncertainty(b): return Uncertainty.from(a).greaterThanOrEquals(b);
    default: return null;
  }
};

module.exports.equivalent = (equivalent = function(a, b) {
  if (typeof a.hasMatch === 'function') { return a.hasMatch(b); }
  return equals(a, b);
});

module.exports.equals = (equals = function(a, b) {
  // Handle null cases first: spec says if either is null, return null
  let key;
  if ((a == null) || (b == null)) { return null; }

  // If one is a Quantity, use the Quantity equals function
  if (__guard__(a != null ? a.constructor : undefined, x => x.name) === 'Quantity') { return a.equals(b); }

  // If one is an Uncertainty, convert the other to an Uncertainty
  if (a instanceof Uncertainty) { b = Uncertainty.from(b);
  } else if (b instanceof Uncertainty) { a = Uncertainty.from(a); }

  // Use overloaded 'equals' function if it is available
  if (typeof a.equals === 'function') { return a.equals(b); }

  // Return true of the objects are strictly equal
  if (a === b) { return true; }

  // Return false if they are instances of different classes
  const [aClass, bClass] = Array.from(([a, b].map((obj) => ({}.toString.call(obj)))));
  if (aClass !== bClass) { return false; }

  switch (aClass) {
    case '[object Date]':
      // Compare the ms since epoch
      return a.getTime() === b.getTime();
      break;
    case '[object RegExp]':
      // Compare the components of the regular expression
      return ['source', 'global', 'ignoreCase', 'multiline'].every(p => a[p] === b[p]);
      break;
    case '[object Array]':
      // Compare every item in the array
      return (a.length === b.length) && a.every((item, i) => equals(item, b[i]));
      break;
    case '[object Object]':
      // Return false if they are instances of different classes
      if (!(b instanceof a.constructor) || !(a instanceof b.constructor)) { return false; }
      // Do deep comparison of keys and values
      var aKeys = (typeof(key) !== 'function' ? (() => {
        const result = [];
        for (key in a) {
          result.push(key);
        }
        return result;
      })() : undefined);
      var bKeys = (typeof(key) !== 'function' ? (() => {
        const result1 = [];
        for (key in b) {
          result1.push(key);
        }
        return result1;
      })() : undefined);
      return (aKeys.length === bKeys.length) && aKeys.every(key => equals(a[key], b[key]));
      break;
  }

  // If we made it this far, we can't handle it
  return false;
});

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}