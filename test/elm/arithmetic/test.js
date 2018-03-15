// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const should = require('should');
const setup = require('../../setup');
const data = require('./data');
const Q = require('../../../src/elm/quantity');

const validateQuantity = function(object,expectedValue,expectedUnit) {
  object.constructor.name.should.equal('Quantity');
  const q = Q.createQuantity(expectedValue,expectedUnit);
  return q.equals(object).should.be.true(`Expected ${object} to equal ${q}`);
};

const doQuantityMathTests = function(tests, operator) {
  const func = (() => { switch (operator) {
  case '*': return Q.doMultiplication;
  case '/': return Q.doDivision;
  case '+': return Q.doAddition;
  case '-': return Q.doSubtraction;
    } })();

  return (() => {
    const result = [];
    for (let x of tests) {
      const a = Q.parseQuantity(x[0]);
      const b = Q.parseQuantity(x[1]);
      // try to parse the expected value but if it comes back null
      // which it will if there are no units create a new Quantity
      // with just the exepected as the value with null units
      const e = Q.parseQuantity(x[2]) || new Q.Quantity({value: x[2]});

      const res = func(a,b);
      result.push(e.equals(res).should.be.true(a + ' ' + operator + ' ' + b + ' should eq ' + e + ' but was ' + res ));
    }
    return result;
  })();
};


describe('Add', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should add two numbers', function() {
    return this.onePlusTwo.exec(this.ctx).should.equal(3);
  });

  it('should add multiple numbers', function() {
    return this.addMultiple.exec(this.ctx).should.equal(55);
  });

  return it('should add variables', function() {
    return this.addVariables.exec(this.ctx).should.equal(21);
  });
});

describe('Subtract', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should subtract two numbers', function() {
    return this.fiveMinusTwo.exec(this.ctx).should.equal(3);
  });

  it('should subtract multiple numbers', function() {
    return this.subtractMultiple.exec(this.ctx).should.equal(15);
  });

  return it('should subtract variables', function() {
    return this.subtractVariables.exec(this.ctx).should.equal(1);
  });
});

describe('Multiply', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should multiply two numbers', function() {
    return this.fiveTimesTwo.exec(this.ctx).should.equal(10);
  });

  it('should multiply multiple numbers', function() {
    return this.multiplyMultiple.exec(this.ctx).should.equal(120);
  });

  return it('should multiply variables', function() {
    return this.multiplyVariables.exec(this.ctx).should.equal(110);
  });
});

describe('Divide', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should divide two numbers', function() {
    return this.tenDividedByTwo.exec(this.ctx).should.equal(5);
  });

  it('should divide two numbers that don\'t evenly divide', function() {
    return this.tenDividedByFour.exec(this.ctx).should.equal(2.5);
  });

  it('should divide multiple numbers', function() {
    return this.divideMultiple.exec(this.ctx).should.equal(5);
  });

  return it('should divide variables', function() {
    return this.divideVariables.exec(this.ctx).should.equal(25);
  });
});

describe('Negate', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  return it('should negate a number', function() {
    return this.negativeOne.exec(this.ctx).should.equal(-1);
  });
});

describe('MathPrecedence', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should follow order of operations', function() {
    return this.mixed.exec(this.ctx).should.equal(46);
  });

  return it('should allow parentheses to override order of operations', function() {
    return this.parenthetical.exec(this.ctx).should.equal(-10);
  });
});

describe('Power', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  return it('should be able to calculate the power of a number' , function() {
    return this.pow.exec(this.ctx).should.equal(81);
  });
});

describe('TruncatedDivide', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  return it('should be able to return just the integer portion of a division', function() {
    this.trunc.exec(this.ctx).should.equal(3);
    return this.even.exec(this.ctx).should.equal(3);
  });
});

describe('Truncate', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  return it('should be able to return the integer portion of a number', function() {
    this.trunc.exec(this.ctx).should.equal(10);
    return this.even.exec(this.ctx).should.equal(10);
  });
});

describe('Floor', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  return it('should be able to round down to the closest integer', function() {
    this.flr.exec(this.ctx).should.equal(10);
    return this.even.exec(this.ctx).should.equal(10);
  });
});

describe('Ceiling', function() {
  return this.beforeEach(function() {
    setup(this, data);

    return it('should be able to round up to the closest integer', function() {
      this.ceil.exec(this.ctx).should.equal(11);
      return this.even.exec(this.ctx).should.equal(10);
    });
  });
});

describe('Ln', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  return it('should be able to return the natural log of a number', function() {
    return this.ln.exec(this.ctx).should.equal(Math.log(4));
  });
});

describe('Log', function() {
  return this.beforeEach(function() {
    setup(this, data);

    return it('should be able to return the log of a number based on an arbitary base value', function() {
      return this.log.exec(this.ctx).should.equal(0.25);
    });
  });
});

describe('Modulo', function() {
  return this.beforeEach(function() {
    setup(this, data);

    return it('should be able to return the remainder of a division', function() {
      return this.mod.exec(this.ctx).should.equal(1);
    });
  });
});

describe('Abs', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should be able to return the absolute value of a positive number', function() {
    return this.pos.exec(this.ctx).should.equal(10);
  });
  it('should be able to return the absolute value of a negative number', function() {
    return this.neg.exec(this.ctx).should.equal(10);
  });
  return it('should be able to return the absolute value of 0', function() {
    return this.zero.exec(this.ctx).should.equal(0);
  });
});

describe('Round', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should be able to round a number up or down to the closest integer value', function() {
    this.up.exec(this.ctx).should.equal(5);
    return this.down.exec(this.ctx).should.equal(4);
  });
  return it('should be able to round a number up or down to the closest decimal place ', function() {
    this.up_percent.exec(this.ctx).should.equal(4.6);
    return this.down_percent.exec(this.ctx).should.equal(4.4);
  });
});

describe('Successor', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should be able to get Integer Successor', function() {
    return this.is.exec(this.ctx).should.equal(3);
  });
  it('should be able to get Real Successor', function() {
    return this.rs.exec(this.ctx).should.equal(( 2.2  + Math.pow(10,-8) ));
  });

  it('should cause runtime error for Successor greater than Integer Max value' , function() {
    return should(() => this.ofr.exec(this.ctx)).throw(Math.OverFlowException);
  });

  it('should be able to get Date Successor for year', function() {
    const dp = this.y_date.exec(this.ctx);
    dp.year.should.equal(2016);
    should.not.exist(dp.month);
    should.not.exist(dp.day);
    should.not.exist(dp.hour);
    should.not.exist(dp.minute);
    should.not.exist(dp.second);
    return should.not.exist(dp.millisecond);
  });

  it('should be able to get Date Successor for year,month', function() {
    const dp = this.ym_date.exec(this.ctx);
    dp.year.should.equal(2015);
    dp.month.should.equal(2);
    should.not.exist(dp.day);
    should.not.exist(dp.hour);
    should.not.exist(dp.minute);
    should.not.exist(dp.second);
    return should.not.exist(dp.millisecond);
  });

  it('should be able to get Date Successor for year,month,day', function() {
    const dp = this.ymd_date.exec(this.ctx);
    dp.year.should.equal(2015);
    dp.month.should.equal(1);
    dp.day.should.equal(2);
    should.not.exist(dp.hour);
    should.not.exist(dp.minute);
    should.not.exist(dp.second);
    return should.not.exist(dp.millisecond);
  });

  it('should be able to get Date Successor for year,month,day,hour', function() {
    const dp = this.ymdh_date.exec(this.ctx);
    dp.year.should.equal(2015);
    dp.month.should.equal(1);
    dp.day.should.equal(1);
    dp.hour.should.equal(1);
    should.not.exist(dp.minute);
    should.not.exist(dp.second);
    return should.not.exist(dp.millisecond);
  });

  it('should be able to get Date Successor for year,month,day,hour,minute', function() {
    const dp = this.ymdhm_date.exec(this.ctx);
    dp.year.should.equal(2015);
    dp.month.should.equal(1);
    dp.day.should.equal(1);
    dp.hour.should.equal(0);
    dp.minute.should.equal(1);
    should.not.exist(dp.second);
    return should.not.exist(dp.millisecond);
  });

  it('should be able to get Date Successor for year,month,day,hour,minute,seconds', function() {
    const dp = this.ymdhms_date.exec(this.ctx);
    dp.year.should.equal(2015);
    dp.month.should.equal(1);
    dp.day.should.equal(1);
    dp.hour.should.equal(0);
    dp.minute.should.equal(0);
    dp.second.should.equal(1);
    return should.not.exist(dp.millisecond);
  });

  it('should be able to get Date Successor for year,month,day,hour,minute,seconds,milliseconds', function() {
    const dp = this.ymdhmsm_date.exec(this.ctx);
    dp.year.should.equal(2015);
    dp.month.should.equal(1);
    dp.day.should.equal(1);
    dp.hour.should.equal(0);
    dp.minute.should.equal(0);
    dp.second.should.equal(0);
    return dp.millisecond.should.equal(1);
  });

  return it('should throw an exception when attempting to get the Successor of the maximum allowed date', function() {
    return should(() => this.max_date.exec(this.ctx)).throw(Math.OverFlowException);
  });
});

describe('Predecessor', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should be able to get Integer Predecessor', function() {
    return this.is.exec(this.ctx).should.equal(1);
  });
  it('should be able to get Real Predecessor', function() {
    return this.rs.exec(this.ctx).should.equal(( 2.2  - Math.pow(10,-8)));
  });
  it('should cause runtime error for Predecessor greater than Integer Max value' , function() {
    return should(() => this.ufr.exec(this.ctx)).throw(Math.OverFlowException);
  });

  it('should be able to get Date Predecessor for year', function() {
    const dp = this.y_date.exec(this.ctx);
    dp.year.should.equal(2014);
    should.not.exist(dp.month);
    should.not.exist(dp.day);
    should.not.exist(dp.hour);
    should.not.exist(dp.minute);
    should.not.exist(dp.second);
    return should.not.exist(dp.millisecond);
  });

  it('should be able to get Date Predecessor for year,month', function() {
    const dp = this.ym_date.exec(this.ctx);
    dp.year.should.equal(2014);
    dp.month.should.equal(12);
    should.not.exist(dp.day);
    should.not.exist(dp.hour);
    should.not.exist(dp.minute);
    should.not.exist(dp.second);
    return should.not.exist(dp.millisecond);
  });

  it('should be able to get Date Predecessor for year,month,day', function() {
    const dp = this.ymd_date.exec(this.ctx);
    dp.year.should.equal(2014);
    dp.month.should.equal(12);
    dp.day.should.equal(31);
    should.not.exist(dp.hour);
    should.not.exist(dp.minute);
    should.not.exist(dp.second);
    return should.not.exist(dp.millisecond);
  });
  it('should be able to get Date Predecessor for year,month,day,hour', function() {
    const dp = this.ymdh_date.exec(this.ctx);
    dp.year.should.equal(2014);
    dp.month.should.equal(12);
    dp.day.should.equal(31);
    dp.hour.should.equal(23);
    should.not.exist(dp.minute);
    should.not.exist(dp.second);
    return should.not.exist(dp.millisecond);
  });

  it('should be able to get Date Predecessor for year,month,day,hour,minute', function() {
    const dp = this.ymdhm_date.exec(this.ctx);
    dp.year.should.equal(2014);
    dp.month.should.equal(12);
    dp.day.should.equal(31);
    dp.hour.should.equal(23);
    dp.minute.should.equal(59);
    should.not.exist(dp.second);
    return should.not.exist(dp.millisecond);
  });

  it('should be able to get Date Predecessor for year,month,day,hour,minute,seconds', function() {
    const dp = this.ymdhms_date.exec(this.ctx);
    dp.year.should.equal(2014);
    dp.month.should.equal(12);
    dp.day.should.equal(31);
    dp.hour.should.equal(23);
    dp.minute.should.equal(59);
    dp.second.should.equal(59);
    return should.not.exist(dp.millisecond);
  });

  it('should be able to get Date Predecessor for year,month,day,hour,minute,seconds,milliseconds', function() {
    const dp = this.ymdhmsm_date.exec(this.ctx);
    dp.year.should.equal(2014);
    dp.month.should.equal(12);
    dp.day.should.equal(31);
    dp.hour.should.equal(23);
    dp.minute.should.equal(59);
    return dp.millisecond.should.equal(999);
  });

  return it('should throw an exception when attempting to get the Predecessor of the minimum allowed date', function() {
    return should(() => this.min_date.exec(this.ctx)).throw(Math.OverFlowException);
  });
});

describe('Quantity', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should be able to perform Quantity Addition', function() {
    validateQuantity(this.add_q_q.exec(this.ctx), 20 , 'days');
    const adq = this.add_d_q.exec(this.ctx);
    adq.constructor.name.should.equal('DateTime');
    adq.year.should.equal(2000);
    adq.month.should.equal(1);
    adq.day.should.equal(11);
    return validateQuantity(this.add_q_q_diff.exec(this.ctx), (10 + (10/(24*60))), 'days');
  });



  it('should be able to perform Quantity Subtraction', function() {
    validateQuantity(this.sub_q_q.exec(this.ctx), 0, 'days');
    const sdq = this.sub_d_q.exec(this.ctx);
    sdq.constructor.name.should.equal('DateTime');
    sdq.year.should.equal(1999);
    sdq.month.should.equal(12);
    sdq.day.should.equal(22);
    return validateQuantity(this.sub_q_q_diff.exec(this.ctx), (10 - (10/(24*60))), 'days');
  });

  it('should be able to perform Quantity Division', function() {
    validateQuantity(this.div_q_d.exec(this.ctx), 5, 'days');
    return validateQuantity(this.div_q_q.exec(this.ctx), 1 , null);
  });

  it('should be able to perform Quantity Multiplication', function() {
    // decilmal to quantity multiplication results in decimal value only
    validateQuantity(this.mul_d_q.exec(this.ctx), 20, 'days');
    validateQuantity(this.mul_q_d.exec(this.ctx), 20, 'days');
    validateQuantity(this.mul_q_q.exec(this.ctx), 20, 'm2');
    return validateQuantity(this.mul_q_q_diff.exec(this.ctx), 20, 'm/d');
  });

  it('should be able to perform Quantity Absolution', function() {
    const q = this.abs.exec(this.ctx);
    q.value.should.equal(10);
    return q.unit.should.equal('days');
  });

  it('should be able to perform Quantity Negation', function() {
    const q = this.neg.exec(this.ctx);
    q.value.should.equal(-10);
    return q.unit.should.equal('days');
  });

  it('should be able to perform ucum multiplication in cql', function() {
    return this.multiplyUcum.exec(this.ctx).should.be.true();
  });

  it('should be able to perform ucum division in cql', function() {
    return this.divideUcum.exec(this.ctx).should.be.true();
  });

  it('should be able to perform ucum addition in cql', function() {
    return this.addUcum.exec(this.ctx).should.be.true();
  });

  it('should be able to perform ucum subtraction in cql', function() {
    return this.subtractUcum.exec(this.ctx).should.be.true();
  });

  it('should be able to perform ucum multiplication', function() {
    const tests = [
      ['10 \'m\'', '20 \'m\'', '200 \'m2\''],
      ['25 \'km\'', '5 \'m\'', '125000 \'m2\''],
      ['10 \'ml\'', '20 \'dl\'', '0.02 \'l2\''],
    ];
    return doQuantityMathTests(tests, '*');
  });

  it('should be able to perform ucum division', function() {
    const tests = [
      ['10 \'m2\'', '5 \'m\'', '2 \'m\''],
      ['25 \'km\'', '5 \'m\'', '5000'],
      ['100 \'m\'', '2 \'h\'', '0.01388889 \'m/s\' '],
      ['100 \'mg\'', '2 \'[lb_av]\'', '50 \'mg/[lb_av]\' ']
    ];
    return doQuantityMathTests(tests, '/');
  });
  it('should be able to perform ucum addition', function() {
    const tests = [
      ['10 \'m\'', '20 \'m\'', '30 \'m\''],
      ['25 \'km\'', '5 \'m\'', '25005 \'m\''],
      ['10 \'ml\'', '20 \'dl\'', '2.01 \'l\''],
    ];
    return doQuantityMathTests(tests, '+');
  });

  return it('should be able to perform ucum subtraction', function() {
    const tests = [
      ['10 \'d\'', '20 \'d\'', '-10 \'d\''],
      ['25 \'km\'', '5 \'m\'', '24995 \'m\''],
      ['10 \'ml\'', '20 \'dl\'', '-1.99 \'l\''],
    ];
    return doQuantityMathTests(tests, '-');
  });
});
