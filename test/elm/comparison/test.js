/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const should = require('should');
const setup = require('../../setup');
const data = require('./data');

// TO Comparisons for Dates

describe('Equal', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should be false for 5 = 4', function() {
    return this.aGtB_Int.exec(this.ctx).should.be.false();
  });

  it('should be true for 5 = 5', function() {
    return this.aEqB_Int.exec(this.ctx).should.be.true();
  });

  it('should be false for 5 = 6', function() {
    return this.aLtB_Int.exec(this.ctx).should.be.false();
  });

  it('should identify equal/unequal tuples', function() {
    this.eqTuples.exec(this.ctx).should.be.true();
    return this.uneqTuples.exec(this.ctx).should.be.false();
  });

  it('should identify equal/unequal DateTimes in same timezone', function() {
    this.eqDateTimes.exec(this.ctx).should.be.true();
    return this.uneqDateTimes.exec(this.ctx).should.be.false();
  });

  it('should identify equal/unequal DateTimes in different timezones', function() {
    this.eqDateTimesTZ.exec(this.ctx).should.be.true();
    return this.uneqDateTimesTZ.exec(this.ctx).should.be.false();
  });

  it('should identify uncertain/unequal DateTimes when there is imprecision', function() {
    should(this.possiblyEqualDateTimes.exec(this.ctx)).be.null();
    return this.impossiblyEqualDateTimes.exec(this.ctx).should.be.false();
  });

  it('should be false for 5 m = 4 m', function() {
    return this.aGtB_Quantity.exec(this.ctx).should.be.false();
  });

  it('should be true for 5 m = 5 m', function() {
    return this.aEqB_Quantity.exec(this.ctx).should.be.true();
  });

  it('should be false for 5 m = 6 m', function() {
    return this.aLtB_Quantity.exec(this.ctx).should.be.false();
  });

  it('should be false for 5 m = 5 cm', function() {
    return this.aGtB_Quantity_diff.exec(this.ctx).should.be.false();
  });

  it('should be true for 5 m = 500 cm ', function() {
    return this.aEqB_Quantity_diff.exec(this.ctx).should.be.true();
  });

  it('should be false for 5 m = 5 km', function() {
    return this.aLtB_Quantity_diff.exec(this.ctx).should.be.false();
  });

  it('should be null for 5 Cel = 4 m', function() {
    return should(this.aGtB_Quantity_incompatible.exec(this.ctx)).be.null();
  });

  it('should be null for 5 Cel = 5 m', function() {
    return should(this.aEqB_Quantity_incompatible.exec(this.ctx)).be.null();
  });

  return it('should be null for 5 Cel = 40 m', function() {
    return should(this.aLtB_Quantity_incompatible.exec(this.ctx)).be.null();
  });
});

describe('NotEqual', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should be true for 5 <> 4', function() {
    return this.aGtB_Int.exec(this.ctx).should.be.true();
  });

  it('should be false for 5 <> 5', function() {
    return this.aEqB_Int.exec(this.ctx).should.be.false();
  });

  it('should be true for 5 <> 6', function() {
    return this.aLtB_Int.exec(this.ctx).should.be.true();
  });

  it('should identify equal/unequal tuples', function() {
    this.eqTuples.exec(this.ctx).should.be.false();
    return this.uneqTuples.exec(this.ctx).should.be.true();
  });

  it('should identify equal/unequal DateTimes in same timezone', function() {
    this.eqDateTimes.exec(this.ctx).should.be.false();
    return this.uneqDateTimes.exec(this.ctx).should.be.true();
  });

  it('should identify equal/unequal DateTimes in different timezones', function() {
    this.eqDateTimesTZ.exec(this.ctx).should.be.false();
    return this.uneqDateTimesTZ.exec(this.ctx).should.be.true();
  });

  it('should identify uncertain/unequal DateTimes when there is imprecision', function() {
    should(this.possiblyEqualDateTimes.exec(this.ctx)).be.null();
    return this.impossiblyEqualDateTimes.exec(this.ctx).should.be.true();
  });

  it('should be true for 5 m != 4 m', function() {
    return this.aGtB_Quantity.exec(this.ctx).should.be.true();
  });

  it('should be false for 5 m != 5 m', function() {
    return this.aEqB_Quantity.exec(this.ctx).should.be.false();
  });

  it('should be true for 5 m != 6 m', function() {
    return this.aLtB_Quantity.exec(this.ctx).should.be.true();
  });

  it('should be true for 5 m != 5 cm', function() {
    return this.aGtB_Quantity_diff.exec(this.ctx).should.be.true();
  });

  it('should be false for 5 m != 500 cm ', function() {
    return this.aEqB_Quantity_diff.exec(this.ctx).should.be.false();
  });

  it('should be true for 5 m != 5 km', function() {
    return this.aLtB_Quantity_diff.exec(this.ctx).should.be.true();
  });

  it('should be null for 5 Cel != 4 m', function() {
    return should(this.aGtB_Quantity_incompatible.exec(this.ctx)).be.null();
  });

  it('should be null for 5 Cel != 5 m', function() {
    return should(this.aEqB_Quantity_incompatible.exec(this.ctx)).be.null();
  });

  return it('should be null for 5 Cel != 40 m', function() {
    return should(this.aLtB_Quantity_incompatible.exec(this.ctx)).be.null();
  });
});

describe('Equivalent', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should be false for null ~ 4', function() {
    return this.aNull_BDefined.exec(this.ctx).should.be.false();
  });

  it('should be false for 5 ~ null', function() {
    return this.aDefined_BNull.exec(this.ctx).should.be.false();
  });

  it('should be true for null ~ null', function() {
    return this.aNull_BNull.exec(this.ctx).should.be.true();
  });

  return it('should be true for 3 ~ 3', function() {
    return this.aDefined_BDefined.exec(this.ctx).should.be.true();
  });
});

describe('Less', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should be false for 5 < 4', function() {
    return this.aGtB_Int.exec(this.ctx).should.be.false();
  });

  it('should be false for 5 < 5', function() {
    return this.aEqB_Int.exec(this.ctx).should.be.false();
  });

  it('should be true for 5 < 6', function() {
    return this.aLtB_Int.exec(this.ctx).should.be.true();
  });

  it('should be false for 5 m < 4 m', function() {
    return this.aGtB_Quantity.exec(this.ctx).should.be.false();
  });

  it('should be false for 5 m < 5 m', function() {
    return this.aEqB_Quantity.exec(this.ctx).should.be.false();
  });

  it('should be false for 5 m < 6 m', function() {
    return this.aLtB_Quantity.exec(this.ctx).should.be.true();
  });

  it('should be true for 5 m < 5 cm', function() {
    return this.aGtB_Quantity_diff.exec(this.ctx).should.be.false();
  });

  it('should be false for 5 m < 50 cm ', function() {
    return this.aEqB_Quantity_diff.exec(this.ctx).should.be.false();
  });

  it('should be false for 5 m < 5 km', function() {
    return this.aLtB_Quantity_diff.exec(this.ctx).should.be.true();
  });

  it('should be null for 5 Cel < 4 m', function() {
    return should(this.aGtB_Quantity_incompatible.exec(this.ctx)).be.null();
  });

  it('should be null for 5 Cel < 5 m', function() {
    return should(this.aEqB_Quantity_incompatible.exec(this.ctx)).be.null();
  });

  return it('should be null for 5 Cel < 40 m', function() {
    return should(this.aLtB_Quantity_incompatible.exec(this.ctx)).be.null();
  });
});

describe('LessOrEqual', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should be false for 5 <= 4', function() {
    return this.aGtB_Int.exec(this.ctx).should.be.false();
  });

  it('should be true for 5 <= 5', function() {
    return this.aEqB_Int.exec(this.ctx).should.be.true();
  });

  it('should be true for 5 <= 6', function() {
    return this.aLtB_Int.exec(this.ctx).should.be.true();
  });

  it('should be true for 5 m <= 4 m', function() {
    return this.aGtB_Quantity.exec(this.ctx).should.be.false();
  });

  it('should be false for 5 m <= 5 m', function() {
    return this.aEqB_Quantity.exec(this.ctx).should.be.true();
  });

  it('should be false for 5 m <= 6 m', function() {
    return this.aLtB_Quantity.exec(this.ctx).should.be.true();
  });

  it('should be true for 5 m <= 5 cm', function() {
    return this.aGtB_Quantity_diff.exec(this.ctx).should.be.false();
  });

  it('should be false for 5 m <= 500 cm ', function() {
    return this.aEqB_Quantity_diff.exec(this.ctx).should.be.true();
  });

  it('should be false for 5 m <= 5 km', function() {
    return this.aLtB_Quantity_diff.exec(this.ctx).should.be.true();
  });

  it('should be null for 5 Cel <= 4 m', function() {
    return should(this.aGtB_Quantity_incompatible.exec(this.ctx)).be.null();
  });

  it('should be null for 5 Cel <= 5 m', function() {
    return should(this.aEqB_Quantity_incompatible.exec(this.ctx)).be.null();
  });

  return it('should be null for 5 Cel <= 40 m', function() {
    return should(this.aLtB_Quantity_incompatible.exec(this.ctx)).be.null();
  });
});


describe('Greater', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should be true for 5 > 4', function() {
    return this.aGtB_Int.exec(this.ctx).should.be.true();
  });

  it('should be false for 5 > 5', function() {
    return this.aEqB_Int.exec(this.ctx).should.be.false();
  });

  it('should be false for 5 > 6', function() {
    return this.aLtB_Int.exec(this.ctx).should.be.false();
  });

  it('should be true for 5 m > 4 m', function() {
    return this.aGtB_Quantity.exec(this.ctx).should.be.true();
  });

  it('should be false for 5 m > 5 m', function() {
    return this.aEqB_Quantity.exec(this.ctx).should.be.false();
  });

  it('should be false for 5 m > 6 m', function() {
    return this.aLtB_Quantity.exec(this.ctx).should.be.false();
  });

  it('should be true for 5 m > 5 cm', function() {
    return this.aGtB_Quantity_diff.exec(this.ctx).should.be.true();
  });

  it('should be false for 5 m > 50 cm ', function() {
    return this.aEqB_Quantity_diff.exec(this.ctx).should.be.false();
  });

  it('should be false for 5 m > 5 km', function() {
    return this.aLtB_Quantity_diff.exec(this.ctx).should.be.false();
  });

  it('should be null for 5 Cel > 4 m', function() {
    return should(this.aGtB_Quantity_incompatible.exec(this.ctx)).be.null();
  });

  it('should be null for 5 Cel > 5 m', function() {
    return should(this.aEqB_Quantity_incompatible.exec(this.ctx)).be.null();
  });

  return it('should be null for 5 Cel > 40 m', function() {
    return should(this.aLtB_Quantity_incompatible.exec(this.ctx)).be.null();
  });
});


describe('GreaterOrEqual', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should be true for 5 >= 4', function() {
    return this.aGtB_Int.exec(this.ctx).should.be.true();
  });

  it('should be true for 5 >= 5', function() {
    return this.aEqB_Int.exec(this.ctx).should.be.true();
  });

  it('should be false for 5 >= 6', function() {
    return this.aLtB_Int.exec(this.ctx).should.be.false();
  });

  it('should be true for 5 m >= 4 m', function() {
    return this.aGtB_Quantity.exec(this.ctx).should.be.true();
  });

  it('should be false for 5 m  >= 5 m', function() {
    return this.aEqB_Quantity.exec(this.ctx).should.be.true();
  });

  it('should be false for 5 m >= 6 m', function() {
    return this.aLtB_Quantity.exec(this.ctx).should.be.false();
  });

  it('should be true for 5 m >= 5 cm', function() {
    return this.aGtB_Quantity_diff.exec(this.ctx).should.be.true();
  });

  it('should be false for 5 m  >= 50 cm ', function() {
    return this.aEqB_Quantity_diff.exec(this.ctx).should.be.true();
  });

  it('should be false for 5 m  >=5 km', function() {
    return this.aLtB_Quantity_diff.exec(this.ctx).should.be.false();
  });

  it('should be null for 5 Cel >= 4 m', function() {
    return should(this.aGtB_Quantity_incompatible.exec(this.ctx)).be.null();
  });

  it('should be null for 5 Cel >= 5 m', function() {
    return should(this.aEqB_Quantity_incompatible.exec(this.ctx)).be.null();
  });

  it('should be null for 5 Cel >= 40 m', function() {
    return should(this.aLtB_Quantity_incompatible.exec(this.ctx)).be.null();
  });

  it('should be null for 100 [nmi_i] / 2 h > 49 mg/[lb_av]', function() {
    return should(this.divideUcum_incompatible.exec(this.ctx)).be.null();
  });

  return it('should be true for 100 mg / 2 [lb_av]  > 49 mg/[lb_av]', function() {
    return this.divideUcum.exec(this.ctx).should.be.true();
  });
});
