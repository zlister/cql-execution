/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const should = require('should');
const setup = require('../../setup');
const data = require('./data');
const {isNull} = require('../../../lib/util/util');

describe('FromString', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it("should convert 'str' to 'str'", function() {
    return this.stringStr.exec(this.ctx).should.equal("str");
  });

  it("should convert null to null", function() {
    return isNull(this.stringNull.exec(this.ctx)).should.equal(true);
  });

  it("should convert 'true' to true", function() {
    return this.boolTrue.exec(this.ctx).should.equal(true);
  });

  it("should convert 'false' to false", function() {
    return this.boolFalse.exec(this.ctx).should.equal(false);
  });

  it("should convert '10.2' to Decimal", function() {
    return this.decimalValid.exec(this.ctx).should.equal(10.2);
  });

  it("should convert 'abc' to Decimal NaN", function() {
    return isNaN(this.decimalInvalid.exec(this.ctx)).should.equal(true);
  });

  it("should convert '10' to Integer", function() {
    return this.integerValid.exec(this.ctx).should.equal(10);
  });

  it("should convert '10.2' to Integer 10", function() {
    return this.integerDropDecimal.exec(this.ctx).should.equal(10);
  });

  it("should convert 'abc' to Integer NaN", function() {
    return isNaN(this.integerInvalid.exec(this.ctx)).should.equal(true);
  });

  it("should convert \"10 'A'\" to Quantity", function() {
    const quantity = this.quantityStr.exec(this.ctx);
    quantity.value.should.equal(10);
    return quantity.unit.should.equal("A");
  });

  it("should convert \"+10 'A'\" to Quantity", function() {
    const quantity = this.posQuantityStr.exec(this.ctx);
    quantity.value.should.equal(10);
    return quantity.unit.should.equal("A");
  });

  it("should convert \"-10 'A'\" to Quantity", function() {
    const quantity = this.negQuantityStr.exec(this.ctx);
    quantity.value.should.equal(-10);
    return quantity.unit.should.equal("A");
  });

  it("should convert \"10.0'mA'\" to Quantity", function() {
    const quantity = this.quantityStrDecimal.exec(this.ctx);
    quantity.value.should.equal(10.0);
    return quantity.unit.should.equal("mA");
  });

  return it("should convert '2015-01-02' to DateTime", function() {
    const date = this.dateStr.exec(this.ctx);
    date.year.should.equal(2015);
    date.month.should.equal(1);
    return date.day.should.equal(2);
  });
});

describe('FromInteger', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it("should convert 10 to '10'", function() {
    return this.string10.exec(this.ctx).should.equal("10");
  });

  it("should convert 10 to 10.0", function() {
    return this.decimal10.exec(this.ctx).should.equal(10.0);
  });

  it("should convert null to null", function() {
    return isNull(this.intNull.exec(this.ctx)).should.equal(true);
  });

  return it("should convert 10 to 10", function() {
    return this.intInt.exec(this.ctx).should.equal(10);
  });
});

describe('FromQuantity', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it("should convert \"10 'A'\" to \"10 'A'\"", function() {
    return this.quantityStr.exec(this.ctx).should.equal("10 'A'");
  });

  it("should convert \"+10 'A'\" to \"10 'A'\"", function() {
    return this.posQuantityStr.exec(this.ctx).should.equal("10 'A'");
  });

  it("should convert \"-10 'A'\" to \"10 'A'\"", function() {
    return this.negQuantityStr.exec(this.ctx).should.equal("-10 'A'");
  });

  return it("should convert \"10 'A'\" to \"10 'A'\"", function() {
    const quantity = this.quantityQuantity.exec(this.ctx);
    quantity.value.should.equal(10);
    return quantity.unit.should.equal('A');
  });
});

describe('FromBoolean', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it("should convert true to 'true'", function() {
    return this.booleanTrueStr.exec(this.ctx).should.equal("true");
  });

  it("should convert false to 'false'", function() {
    return this.booleanFalseStr.exec(this.ctx).should.equal("false");
  });

  it("should convert true to true", function() {
    return this.booleanTrueBool.exec(this.ctx).should.equal(true);
  });

  return it("should convert false to false", function() {
    return this.booleanFalseBool.exec(this.ctx).should.equal(false);
  });
});

describe('FromDateTime', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it("should convert @2015-01-02 to '2015-01-02'", function() {
    return this.dateStr.exec(this.ctx).should.equal("2015-01-02");
  });

  return it("should convert @2015-01-02 to @2015-01-02", function() {
    const date = this.dateDate.exec(this.ctx);
    date.year.should.equal(2015);
    date.month.should.equal(1);
    return date.day.should.equal(2);
  });
});

describe('FromTime', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it.skip("should convert @T11:57 to '11:57'", function() {
    return this.timeStr.exec(this.ctx).should.equal("11:57");
  });

  return it.skip("should convert @T11:57 to @11:57", function() {
    const time = this.timeTime.exec(this.ctx);
    time.hour.should.equal(11);
    return time.minute.should.equal(57);
  });
});

describe('FromCode', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it.skip("should convert hepB to a concept", function() {
    let concept;
    return concept = this.codeConcept.exec(this.ctx);
  });

  return it.skip("should convert hepB to a code", function() {
    let code;
    return code = this.codeCode.exec(this.ctx);
  });
});
