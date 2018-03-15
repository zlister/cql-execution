/* eslint-disable
    no-undef,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let MAX_DATE_VALUE, MAX_FLOAT_VALUE, MAX_INT_VALUE, MIN_DATE_VALUE, MIN_FLOAT_PRECISION_VALUE, MIN_FLOAT_VALUE, MIN_INT_VALUE, OverFlowException, predecessor, successor;
const { Exception } = require('../datatypes/exception');
const { DateTime } = require('../datatypes/datetime');
const { Uncertainty } = require('../datatypes/uncertainty');

module.exports.MAX_INT_VALUE = (MAX_INT_VALUE = Math.pow(2,31)-1);
module.exports.MIN_INT_VALUE = (MIN_INT_VALUE = Math.pow(-2,31));
module.exports.MAX_FLOAT_VALUE = (MAX_FLOAT_VALUE = ( Math.pow(10,37)-1 ) / Math.pow(10,8));
module.exports.MIN_FLOAT_VALUE = (MIN_FLOAT_VALUE = (Math.pow(-10,37)+1) / Math.pow(10,8));
module.exports.MIN_FLOAT_PRECISION_VALUE = (MIN_FLOAT_PRECISION_VALUE = Math.pow(10,-8));
module.exports.MIN_DATE_VALUE = (MIN_DATE_VALUE = DateTime.parse('0001-01-01T00:00:00.000'));
module.exports.MAX_DATE_VALUE = (MAX_DATE_VALUE = DateTime.parse('9999-12-31T23:59:59.999'));

module.exports.OverFlowException = (OverFlowException = (OverFlowException = class OverFlowException extends Exception {}));

module.exports.successor = (successor = function(val) {
  if (typeof val === 'number') {
    if (parseInt(val) === val) {
      if (val === MAX_INT_VALUE) { throw  new OverFlowException(); } else { return val + 1; }
    } else {
      //not bothering with the max float test because javascript does not handle floats at the level
      //very well
      return val + MIN_FLOAT_PRECISION_VALUE;
    }
  } else if (val instanceof DateTime) {
    if (val.sameAs(MAX_DATE_VALUE)) { throw new OverFlowException(); } else { return val.successor(); }
  } else if (val instanceof Uncertainty) {
    // For uncertainties, if the high is the max val, don't increment it
    const high = (() => { try { return successor(val.high); } catch (e) { return val.high; } })();
    return new Uncertainty(successor(val.low), high);
  } else if (__guard__(val != null ? val.constructor : undefined, x => x.name) === 'Quantity') {
    const succ = val.clone();
    succ.value = successor(val.value);
    return succ;
  } else if ((val == null)) {
    return null;
  }
});

module.exports.predecessor = (predecessor = function(val) {
  if (typeof val === 'number') {
    if (parseInt(val) === val) {
      if (val === MIN_INT_VALUE) { throw  new OverFlowException(); } else { return val - 1; }
    } else {
      //not bothering with the min float test because javascript does not handle floats at the level
      //very well
      return val - MIN_FLOAT_PRECISION_VALUE;
    }
  } else if (val instanceof DateTime) {
    if (val.sameAs(MIN_DATE_VALUE)) { throw new OverFlowException(); } else { return val.predecessor(); }
  } else if (val instanceof Uncertainty) {
    // For uncertainties, if the low is the min val, don't decrement it
    const low = (() => { try { return predecessor(val.low); } catch (e) { return val.low; } })();
    return new Uncertainty(low, predecessor(val.high));
  } else if (__guard__(val != null ? val.constructor : undefined, x => x.name) === 'Quantity') {
    const pred = val.clone();
    pred.value = predecessor(val.value);
    return pred;
  } else if ((val == null)) {
    return null;
  }
});

module.exports.maxValueForInstance = function(val) {
  if (typeof val === 'number') {
    if (parseInt(val) === val) { return MAX_INT_VALUE; } else { return MAX_FLOAT_VALUE; }
  } else if (val instanceof DateTime) {
    return MAX_DATE_VALUE;
  } else if (__guard__(val != null ? val.constructor : undefined, x => x.name) === 'Quantity') {
    const val2 = val.clone();
    val2.value = maxValueForInstance(val2.value);
    return val2;
  } else {
    return null;
  }
};

module.exports.minValueForInstance = function(val) {
  if (typeof val === 'number') {
    if (parseInt(val) === val) { return MIN_INT_VALUE; } else { return MIN_FLOAT_VALUE; }
  } else if (val instanceof DateTime) {
    return MIN_DATE_VALUE;
  } else if (__guard__(val != null ? val.constructor : undefined, x => x.name) === 'Quantity') {
    const val2 = val.clone();
    val2.value = minValueForInstance(val2.value);
    return val2;
  } else {
    return null;
  }
};


module.exports.decimalAdjust =function(type, value, exp) {
  //If the exp is undefined or zero...
  if ((typeof exp === 'undefined') || (+exp === 0)) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  //If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !((typeof exp === 'number') && ((exp % 1) === 0))) {
    return NaN;
  }
  //Shift
  value = value.toString().split('e');
  let v = value[1] ? (+value[1] - exp) : -exp;
  value = Math[type](+(value[0] + 'e' + v));
  //Shift back
  value = value.toString().split('e');
  v = value[1] ? (+value[1] + exp) : exp;
  return +(value[0] + 'e' + v );
};

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}