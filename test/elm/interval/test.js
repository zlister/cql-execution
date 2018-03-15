// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const should = require('should');
const setup = require('../../setup');
const data = require('./data');
const { Interval } = require('../../../lib/datatypes/interval');
const { DateTime } = require('../../../lib/datatypes/datetime');

describe('Interval', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should properly represent an open interval', function() {
    this.open.lowClosed.should.be.false();
    this.open.highClosed.should.be.false();
    this.open.low.exec(this.ctx).should.eql(new DateTime(2012, 1, 1));
    return this.open.high.exec(this.ctx).should.eql(new DateTime(2013, 1, 1));
  });

  it('should properly represent a left-open interval', function() {
    this.leftOpen.lowClosed.should.be.false();
    this.leftOpen.highClosed.should.be.true();
    this.leftOpen.low.exec(this.ctx).should.eql(new DateTime(2012, 1, 1));
    return this.leftOpen.high.exec(this.ctx).should.eql(new DateTime(2013, 1, 1));
  });

  it('should properly represent a right-open interval', function() {
    this.rightOpen.lowClosed.should.be.true();
    this.rightOpen.highClosed.should.be.false();
    this.rightOpen.low.exec(this.ctx).should.eql(new DateTime(2012, 1, 1));
    return this.rightOpen.high.exec(this.ctx).should.eql(new DateTime(2013, 1, 1));
  });

  it('should properly represent a closed interval', function() {
    this.closed.lowClosed.should.be.true();
    this.closed.highClosed.should.be.true();
    this.closed.low.exec(this.ctx).should.eql(new DateTime(2012, 1, 1));
    return this.closed.high.exec(this.ctx).should.eql(new DateTime(2013, 1, 1));
  });

  return it('should exec to native Interval datatype', function() {
    const ivl = this.open.exec(this.ctx);
    ivl.should.be.instanceOf(Interval);
    ivl.lowClosed.should.equal(this.open.lowClosed);
    ivl.highClosed.should.equal(this.open.highClosed);
    ivl.low.should.eql(new DateTime(2012, 1, 1));
    return ivl.high.should.eql(new DateTime(2013, 1, 1));
  });
});

describe('Equal', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should determine equal integer intervals', function() {
    this.equalClosed.exec(this.ctx).should.be.true();
    this.equalOpen.exec(this.ctx).should.be.true();
    return this.equalOpenClosed.exec(this.ctx).should.be.true();
  });

  it('should determine unequal integer intervals', function() {
    this.unequalClosed.exec(this.ctx).should.be.false();
    this.unequalOpen.exec(this.ctx).should.be.false();
    return this.unequalClosedOpen.exec(this.ctx).should.be.false();
  });

  it('should determine equal quantity intervals', function() {
    this.equalQuantityClosed.exec(this.ctx).should.be.true();
    this.equalQuantityOpen.exec(this.ctx).should.be.true();
    return this.equalQuantityOpenClosed.exec(this.ctx).should.be.true();
  });

  it('should determine unequal quantity intervals', function() {
    this.unequalQuantityClosed.exec(this.ctx).should.be.false();
    this.unequalQuantityOpen.exec(this.ctx).should.be.false();
    return this.unequalQuantityClosedOpen.exec(this.ctx).should.be.false();
  });

  it('should determine equal datetime intervals', function() {
    this.equalDates.exec(this.ctx).should.be.true();
    return this.equalDatesOpenClosed.exec(this.ctx).should.be.true();
  });

  return it('should operate correctly with imprecision', function() {
    should(this.sameDays.exec(this.ctx)).be.null;
    return this.differentDays.exec(this.ctx).should.be.false();
  });
});

describe('NotEqual', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should determine equal integer intervals', function() {
    this.equalClosed.exec(this.ctx).should.be.false();
    this.equalOpen.exec(this.ctx).should.be.false();
    return this.equalOpenClosed.exec(this.ctx).should.be.false();
  });

  it('should determine unequal integer intervals', function() {
    this.unequalClosed.exec(this.ctx).should.be.true();
    this.unequalOpen.exec(this.ctx).should.be.true();
    return this.unequalClosedOpen.exec(this.ctx).should.be.true();
  });

  it('should determine equal quantity intervals', function() {
    this.equalQuantityClosed.exec(this.ctx).should.be.false();
    this.equalQuantityOpen.exec(this.ctx).should.be.false();
    return this.equalQuantityOpenClosed.exec(this.ctx).should.be.false();
  });

  it('should determine unequal quantity intervals', function() {
    this.unequalQuantityClosed.exec(this.ctx).should.be.true();
    this.unequalQuantityOpen.exec(this.ctx).should.be.true();
    return this.unequalQuantityClosedOpen.exec(this.ctx).should.be.true();
  });

  it('should determine equal datetime intervals', function() {
    this.equalDates.exec(this.ctx).should.be.false();
    return this.equalDatesOpenClosed.exec(this.ctx).should.be.false();
  });

  return it('should operate correctly with imprecision', function() {
    should(this.sameDays.exec(this.ctx)).be.null;
    return this.differentDays.exec(this.ctx).should.be.true();
  });
});

describe('Contains', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should accept contained items', function() {
    this.containsInt.exec(this.ctx).should.be.true();
    this.containsReal.exec(this.ctx).should.be.true();
    this.containsQuantity.exec(this.ctx).should.be.true();
    this.containsQuantityInclusiveEdge.exec(this.ctx).should.be.true();
    return this.containsDate.exec(this.ctx).should.be.true();
  });

  it('should reject uncontained items', function() {
    this.notContainsInt.exec(this.ctx).should.be.false();
    this.notContainsReal.exec(this.ctx).should.be.false();
    this.notContainsQuantity.exec(this.ctx).should.be.false();
    this.notContainsQuantityExclusiveEdge.exec(this.ctx).should.be.false();
    return this.notContainsDate.exec(this.ctx).should.be.false();
  });

  it('should correctly handle null endpoints (int)', function() {
    this.negInfBegContainsInt.exec(this.ctx).should.be.true();
    this.negInfBegNotContainsInt.exec(this.ctx).should.be.false();
    this.unknownBegContainsInt.exec(this.ctx).should.be.true();
    should(this.unknownBegMayContainInt.exec(this.ctx)).be.null;
    this.unknownBegNotContainsInt.exec(this.ctx).should.be.false();
    this.posInfEndContainsInt.exec(this.ctx).should.be.true();
    this.posInfEndNotContainsInt.exec(this.ctx).should.be.false();
    this.unknownEndContainsInt.exec(this.ctx).should.be.true();
    should(this.unknownEndMayContainInt.exec(this.ctx)).be.null;
    return this.unknownEndNotContainsInt.exec(this.ctx).should.be.false();
  });

  it('should correctly handle null endpoints (date)', function() {
    this.negInfBegContainsDate.exec(this.ctx).should.be.true();
    this.negInfBegNotContainsDate.exec(this.ctx).should.be.false();
    this.unknownBegContainsDate.exec(this.ctx).should.be.true();
    should(this.unknownBegMayContainDate.exec(this.ctx)).be.null;
    this.unknownBegNotContainsDate.exec(this.ctx).should.be.false();
    this.posInfEndContainsDate.exec(this.ctx).should.be.true();
    this.posInfEndNotContainsDate.exec(this.ctx).should.be.false();
    this.unknownEndContainsDate.exec(this.ctx).should.be.true();
    should(this.unknownEndMayContainDate.exec(this.ctx)).be.null;
    return this.unknownEndNotContainsDate.exec(this.ctx).should.be.false();
  });

  it('should correctly handle imprecision', function() {
    this.containsImpreciseDate.exec(this.ctx).should.be.true();
    this.notContainsImpreciseDate.exec(this.ctx).should.be.false();
    should(this.mayContainImpreciseDate.exec(this.ctx)).be.null;
    this.impreciseContainsDate.exec(this.ctx).should.be.true();
    this.impreciseNotContainsDate.exec(this.ctx).should.be.false();
    return should(this.impreciseMayContainDate.exec(this.ctx)).be.null;
  });

  return it('should correctly compare using the requested precision', function() {
    this.containsDayOfDateLowEdge.exec(this.ctx).should.be.true();
    this.containsDayOfDateHighEdge.exec(this.ctx).should.be.true();
    this.notContainsDayOfDateLowEdge.exec(this.ctx).should.be.false();
    this.notContainsDayOfDateHighEdge.exec(this.ctx).should.be.false();
    this.containsDayOfDateImpreciseLowEdge.exec(this.ctx).should.be.true();
    this.containsDayOfDateImpreciseHighEdge.exec(this.ctx).should.be.true();
    this.containsDayOfDateVeryImpreciseMiddle.exec(this.ctx).should.be.true();
    this.notContainsDayOfDateVeryImpreciseLow.exec(this.ctx).should.be.false();
    this.notContainsDayOfDateVeryImpreciseHigh.exec(this.ctx).should.be.false();
    should(this.mayContainDayOfDateVeryImpreciseLow.exec(this.ctx)).be.null();
    should(this.mayContainDayOfDateVeryImpreciseHigh.exec(this.ctx)).be.null();
    return should(this.mayContainDayOfDateVeryImpreciseSurrounding.exec(this.ctx)).be.null();
  });
});

describe('In', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should accept contained items', function() {
    this.containsInt.exec(this.ctx).should.be.true();
    this.containsReal.exec(this.ctx).should.be.true();
    this.containsQuantity.exec(this.ctx).should.be.true();
    this.containsQuantityInclusiveEdge.exec(this.ctx).should.be.true();
    return this.containsDate.exec(this.ctx).should.be.true();
  });

  it('should reject uncontained items', function() {
    this.notContainsInt.exec(this.ctx).should.be.false();
    this.notContainsReal.exec(this.ctx).should.be.false();
    this.notContainsQuantity.exec(this.ctx).should.be.false();
    this.notContainsQuantityExclusiveEdge.exec(this.ctx).should.be.false();
    return this.notContainsDate.exec(this.ctx).should.be.false();
  });

  it('should correctly handle null endpoints (int)', function() {
    this.negInfBegContainsInt.exec(this.ctx).should.be.true();
    this.negInfBegNotContainsInt.exec(this.ctx).should.be.false();
    this.unknownBegContainsInt.exec(this.ctx).should.be.true();
    should(this.unknownBegMayContainInt.exec(this.ctx)).be.null;
    this.unknownBegNotContainsInt.exec(this.ctx).should.be.false();
    this.posInfEndContainsInt.exec(this.ctx).should.be.true();
    this.posInfEndNotContainsInt.exec(this.ctx).should.be.false();
    this.unknownEndContainsInt.exec(this.ctx).should.be.true();
    should(this.unknownEndMayContainInt.exec(this.ctx)).be.null;
    return this.unknownEndNotContainsInt.exec(this.ctx).should.be.false();
  });

  it('should correctly handle null endpoints (date)', function() {
    this.negInfBegContainsDate.exec(this.ctx).should.be.true();
    this.negInfBegNotContainsDate.exec(this.ctx).should.be.false();
    this.unknownBegContainsDate.exec(this.ctx).should.be.true();
    should(this.unknownBegMayContainDate.exec(this.ctx)).be.null;
    this.unknownBegNotContainsDate.exec(this.ctx).should.be.false();
    this.posInfEndContainsDate.exec(this.ctx).should.be.true();
    this.posInfEndNotContainsDate.exec(this.ctx).should.be.false();
    this.unknownEndContainsDate.exec(this.ctx).should.be.true();
    should(this.unknownEndMayContainDate.exec(this.ctx)).be.null;
    return this.unknownEndNotContainsDate.exec(this.ctx).should.be.false();
  });

  it('should correctly handle imprecision', function() {
    this.containsImpreciseDate.exec(this.ctx).should.be.true();
    this.notContainsImpreciseDate.exec(this.ctx).should.be.false();
    should(this.mayContainImpreciseDate.exec(this.ctx)).be.null;
    this.impreciseContainsDate.exec(this.ctx).should.be.true();
    this.impreciseNotContainsDate.exec(this.ctx).should.be.false();
    return should(this.impreciseMayContainDate.exec(this.ctx)).be.null;
  });

  return it('should correctly compare using the requested precision', function() {
    this.containsDayOfDateLowEdge.exec(this.ctx).should.be.true();
    this.containsDayOfDateHighEdge.exec(this.ctx).should.be.true();
    this.notContainsDayOfDateLowEdge.exec(this.ctx).should.be.false();
    this.notContainsDayOfDateHighEdge.exec(this.ctx).should.be.false();
    this.containsDayOfDateImpreciseLowEdge.exec(this.ctx).should.be.true();
    this.containsDayOfDateImpreciseHighEdge.exec(this.ctx).should.be.true();
    this.containsDayOfDateVeryImpreciseMiddle.exec(this.ctx).should.be.true();
    this.notContainsDayOfDateVeryImpreciseLow.exec(this.ctx).should.be.false();
    this.notContainsDayOfDateVeryImpreciseHigh.exec(this.ctx).should.be.false();
    should(this.mayContainDayOfDateVeryImpreciseLow.exec(this.ctx)).be.null();
    should(this.mayContainDayOfDateVeryImpreciseHigh.exec(this.ctx)).be.null();
    return should(this.mayContainDayOfDateVeryImpreciseSurrounding.exec(this.ctx)).be.null();
  });
});

describe('Includes', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should accept included items', function() {
    this.includesIntIvl.exec(this.ctx).should.be.true();
    this.includesRealIvl.exec(this.ctx).should.be.true();
    return this.includesDateIvl.exec(this.ctx).should.be.true();
  });

  it('should reject unincluded items', function() {
    this.notIncludesIntIvl.exec(this.ctx).should.be.false();
    this.notIncludesRealIvl.exec(this.ctx).should.be.false();
    return this.notIncludesDateIvl.exec(this.ctx).should.be.false();
  });

  it('should correctly handle null endpoints (int)', function() {
    this.negInfBegIncludesIntIvl.exec(this.ctx).should.be.true();
    this.negInfBegNotIncludesIntIvl.exec(this.ctx).should.be.false();
    this.unknownBegIncludesIntIvl.exec(this.ctx).should.be.true();
    should(this.unknownBegMayIncludeIntIvl.exec(this.ctx)).be.null;
    this.unknownBegNotIncludesIntIvl.exec(this.ctx).should.be.false();
    this.posInfEndIncludesIntIvl.exec(this.ctx).should.be.true();
    this.posInfEndNotIncludesIntIvl.exec(this.ctx).should.be.false();
    this.unknownEndIncludesIntIvl.exec(this.ctx).should.be.true();
    should(this.unknownEndMayIncludeIntIvl.exec(this.ctx)).be.null;
    return this.unknownEndNotIncludesIntIvl.exec(this.ctx).should.be.false();
  });

  it('should correctly handle null endpoints (date)', function() {
    this.negInfBegIncludesDateIvl.exec(this.ctx).should.be.true();
    this.negInfBegNotIncludesDateIvl.exec(this.ctx).should.be.false();
    this.unknownBegIncludesDateIvl.exec(this.ctx).should.be.true();
    should(this.unknownBegMayIncludeDateIvl.exec(this.ctx)).be.null;
    this.unknownBegNotIncludesDateIvl.exec(this.ctx).should.be.false();
    this.posInfEndIncludesDateIvl.exec(this.ctx).should.be.true();
    this.posInfEndNotIncludesDateIvl.exec(this.ctx).should.be.false();
    this.unknownEndIncludesDateIvl.exec(this.ctx).should.be.true();
    should(this.unknownEndMayIncludeDateIvl.exec(this.ctx)).be.null;
    return this.unknownEndNotIncludesDateIvl.exec(this.ctx).should.be.false();
  });

  it('should correctly handle imprecision', function() {
    this.includesImpreciseDateIvl.exec(this.ctx).should.be.true();
    this.notIncludesImpreciseDateIvl.exec(this.ctx).should.be.false();
    should(this.mayIncludeImpreciseDateIvl.exec(this.ctx)).be.null;
    this.impreciseIncludesDateIvl.exec(this.ctx).should.be.true();
    this.impreciseNotIncludesDateIvl.exec(this.ctx).should.be.false();
    return should(this.impreciseMayIncludeDateIvl.exec(this.ctx)).be.null;
  });

  return it('should correctly compare using the requested precision', function() {
    this.includesDayOfIvlLowEdge.exec(this.ctx).should.be.true();
    this.includesDayOfIvlHighEdge.exec(this.ctx).should.be.true();
    this.notIncludesDayOfIvlLowEdge.exec(this.ctx).should.be.false();
    this.notIncludesDayOfIvlHighEdge.exec(this.ctx).should.be.false();
    this.includesDayOfIvlImpreciseLowEdge.exec(this.ctx).should.be.true();
    this.includesDayOfIvlImpreciseHighEdge.exec(this.ctx).should.be.true();
    this.includesDayOfIvlVeryImpreciseMiddle.exec(this.ctx).should.be.true();
    this.notIncludesDayOfIvlVeryImpreciseLow.exec(this.ctx).should.be.false();
    this.notIncludesDayOfIvlVeryImpreciseHigh.exec(this.ctx).should.be.false();
    should(this.mayIncludeDayOfIvlVeryImpreciseLow.exec(this.ctx)).be.null();
    should(this.mayIncludeDayOfIvlVeryImpreciseHigh.exec(this.ctx)).be.null();
    return should(this.mayIncludeDayOfIvlVeryImpreciseSurrounding.exec(this.ctx)).be.null();
  });
});

describe('ProperlyIncludes', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should accept properly included intervals', function() {
    this.properlyIncludesIntIvl.exec(this.ctx).should.be.true();
    this.properlyIncludesIntBeginsIvl.exec(this.ctx).should.be.true();
    this.properlyIncludesIntEndsIvl.exec(this.ctx).should.be.true();
    this.properlyIncludesRealIvl.exec(this.ctx).should.be.true();
    return this.properlyIncludesDateIvl.exec(this.ctx).should.be.true();
  });

  it('should reject intervals not properly included', function() {
    this.notProperlyIncludesIntIvl.exec(this.ctx).should.be.false();
    this.notProperlyIncludesRealIvl.exec(this.ctx).should.be.false();
    return this.notProperlyIncludesDateIvl.exec(this.ctx).should.be.false();
  });

  it('should correctly handle null endpoints (int)', function() {
    this.posInfEndProperlyIncludesIntIvl.exec(this.ctx).should.be.true();
    this.posInfEndNotProperlyIncludesIntIvl.exec(this.ctx).should.be.false();
    return should(this.unknownEndMayProperlyIncludeIntIvl.exec(this.ctx)).be.null;
  });

  return it('should correctly compare using the requested precision', function() {
    this.properlyIncludesDayOfIvlLowEdge.exec(this.ctx).should.be.true();
    this.properlyIncludesDayOfIvlHighEdge.exec(this.ctx).should.be.true();
    this.properlyIncludesDayOfIvlNearEdges.exec(this.ctx).should.be.true();
    this.notProperlyIncludesDayOfIvlSameEdges.exec(this.ctx).should.be.false();
    should(this.mayProperlyIncludeDayOfIvlVeryImpreciseLow.exec(this.ctx)).be.null();
    should(this.mayProperlyIncludeDayOfIvlVeryImpreciseHigh.exec(this.ctx)).be.null();
    should(this.mayProperlyIncludeDayOfIvlVeryImpreciseLowAndHigh.exec(this.ctx)).be.null();
    return should(this.mayProperlyIncludeDayOfIvlVeryImpreciseSurrounding.exec(this.ctx)).be.null();
  });
});

describe('IncludedIn', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should accept included items', function() {
    this.includesIntIvl.exec(this.ctx).should.be.true();
    this.includesRealIvl.exec(this.ctx).should.be.true();
    return this.includesDateIvl.exec(this.ctx).should.be.true();
  });

  it('should reject unincluded items', function() {
    this.notIncludesIntIvl.exec(this.ctx).should.be.false();
    this.notIncludesRealIvl.exec(this.ctx).should.be.false();
    return this.notIncludesDateIvl.exec(this.ctx).should.be.false();
  });

  it('should correctly handle null endpoints (int)', function() {
    this.negInfBegIncludedInIntIvl.exec(this.ctx).should.be.true();
    this.negInfBegNotIncludedInIntIvl.exec(this.ctx).should.be.false();
    this.unknownBegIncludedInIntIvl.exec(this.ctx).should.be.true();
    should(this.unknownBegMayBeIncludedInIntIvl.exec(this.ctx)).be.null;
    this.unknownBegNotIncludedInIntIvl.exec(this.ctx).should.be.false();
    this.posInfEndIncludedInIntIvl.exec(this.ctx).should.be.true();
    this.posInfEndNotIncludedInIntIvl.exec(this.ctx).should.be.false();
    this.unknownEndIncludedInIntIvl.exec(this.ctx).should.be.true();
    should(this.unknownEndMayBeIncludedInIntIvl.exec(this.ctx)).be.null;
    return this.unknownEndNotIncludedInIntIvl.exec(this.ctx).should.be.false();
  });

  it('should correctly handle null endpoints (date)', function() {
    this.negInfBegIncludedInDateIvl.exec(this.ctx).should.be.true();
    this.negInfBegNotIncludedInDateIvl.exec(this.ctx).should.be.false();
    this.unknownBegIncludedInDateIvl.exec(this.ctx).should.be.true();
    should(this.unknownBegMayBeIncludedInDateIvl.exec(this.ctx)).be.null;
    this.unknownBegNotIncludedInDateIvl.exec(this.ctx).should.be.false();
    this.posInfEndIncludedInDateIvl.exec(this.ctx).should.be.true();
    this.posInfEndNotIncludedInDateIvl.exec(this.ctx).should.be.false();
    this.unknownEndIncludedInDateIvl.exec(this.ctx).should.be.true();
    should(this.unknownEndMayBeIncludedInDateIvl.exec(this.ctx)).be.null;
    return this.unknownEndNotIncludedInDateIvl.exec(this.ctx).should.be.false();
  });

  it('should correctly handle imprecision', function() {
    this.includesImpreciseDateIvl.exec(this.ctx).should.be.true();
    this.notIncludesImpreciseDateIvl.exec(this.ctx).should.be.false();
    should(this.mayIncludeImpreciseDateIvl.exec(this.ctx)).be.null;
    this.impreciseIncludesDateIvl.exec(this.ctx).should.be.true();
    this.impreciseNotIncludesDateIvl.exec(this.ctx).should.be.false();
    return should(this.impreciseMayIncludeDateIvl.exec(this.ctx)).be.null;
  });

  return it('should correctly compare using the requested precision', function() {
    this.includesDayOfIvlLowEdge.exec(this.ctx).should.be.true();
    this.includesDayOfIvlHighEdge.exec(this.ctx).should.be.true();
    this.notIncludesDayOfIvlLowEdge.exec(this.ctx).should.be.false();
    this.notIncludesDayOfIvlHighEdge.exec(this.ctx).should.be.false();
    this.includesDayOfIvlImpreciseLowEdge.exec(this.ctx).should.be.true();
    this.includesDayOfIvlImpreciseHighEdge.exec(this.ctx).should.be.true();
    this.includesDayOfIvlVeryImpreciseMiddle.exec(this.ctx).should.be.true();
    this.notIncludesDayOfIvlVeryImpreciseLow.exec(this.ctx).should.be.false();
    this.notIncludesDayOfIvlVeryImpreciseHigh.exec(this.ctx).should.be.false();
    should(this.mayIncludeDayOfIvlVeryImpreciseLow.exec(this.ctx)).be.null();
    should(this.mayIncludeDayOfIvlVeryImpreciseHigh.exec(this.ctx)).be.null();
    return should(this.mayIncludeDayOfIvlVeryImpreciseSurrounding.exec(this.ctx)).be.null();
  });
});

describe('ProperlyIncludedIn', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should accept properly included intervals', function() {
    this.properlyIncludesIntIvl.exec(this.ctx).should.be.true();
    this.properlyIncludesIntBeginsIvl.exec(this.ctx).should.be.true();
    this.properlyIncludesIntEndsIvl.exec(this.ctx).should.be.true();
    this.properlyIncludesRealIvl.exec(this.ctx).should.be.true();
    return this.properlyIncludesDateIvl.exec(this.ctx).should.be.true();
  });

  it('should reject intervals not properly included', function() {
    this.notProperlyIncludesIntIvl.exec(this.ctx).should.be.false();
    this.notProperlyIncludesRealIvl.exec(this.ctx).should.be.false();
    return this.notProperlyIncludesDateIvl.exec(this.ctx).should.be.false();
  });

  it('should correctly handle null endpoints (int)', function() {
    this.posInfEndProperlyIncludedInDateIvl.exec(this.ctx).should.be.true();
    this.posInfEndNotProperlyIncludedInDateIvl.exec(this.ctx).should.be.false();
    return should(this.unknownEndMayBeProperlyIncludedInDateIvl.exec(this.ctx)).be.null;
  });

  return it('should correctly compare using the requested precision', function() {
    this.properlyIncludesDayOfIvlLowEdge.exec(this.ctx).should.be.true();
    this.properlyIncludesDayOfIvlHighEdge.exec(this.ctx).should.be.true();
    this.properlyIncludesDayOfIvlNearEdges.exec(this.ctx).should.be.true();
    this.notProperlyIncludesDayOfIvlSameEdges.exec(this.ctx).should.be.false();
    should(this.mayProperlyIncludeDayOfIvlVeryImpreciseLow.exec(this.ctx)).be.null();
    should(this.mayProperlyIncludeDayOfIvlVeryImpreciseHigh.exec(this.ctx)).be.null();
    should(this.mayProperlyIncludeDayOfIvlVeryImpreciseLowAndHigh.exec(this.ctx)).be.null();
    return should(this.mayProperlyIncludeDayOfIvlVeryImpreciseSurrounding.exec(this.ctx)).be.null();
  });
});

describe('After', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should accept intervals before it', function() {
    this.afterIntIvl.exec(this.ctx).should.be.true();
    this.afterRealIvl.exec(this.ctx).should.be.true();
    return this.afterDateIvl.exec(this.ctx).should.be.true();
  });

  it('should reject intervals on or after it', function() {
    this.notAfterIntIvl.exec(this.ctx).should.be.false();
    this.notAfterRealIvl.exec(this.ctx).should.be.false();
    return this.notAfterDateIvl.exec(this.ctx).should.be.false();
  });

  it('should correctly handle null endpoints (int)', function() {
    this.negInfBegNotAfterIntIvl.exec(this.ctx).should.be.false();
    should(this.unknownBegMayBeAfterIntIvl.exec(this.ctx)).be.null;
    this.unknownBegNotAfterIntIvl.exec(this.ctx).should.be.false();
    this.posInfEndAfterIntIvl.exec(this.ctx).should.be.true();
    this.posInfEndNotAfterIntIvl.exec(this.ctx).should.be.false();
    this.unknownEndAfterIntIvl.exec(this.ctx).should.be.true();
    return this.unknownEndNotAfterIntIvl.exec(this.ctx).should.be.false();
  });

  it('should correctly handle null endpoints (date)', function() {
    this.negInfBegNotAfterDateIvl.exec(this.ctx).should.be.false();
    should(this.unknownBegMayBeAfterDateIvl.exec(this.ctx)).be.null;
    this.unknownBegNotAfterDateIvl.exec(this.ctx).should.be.false();
    this.posInfEndAfterDateIvl.exec(this.ctx).should.be.true();
    this.posInfEndNotAfterDateIvl.exec(this.ctx).should.be.false();
    this.unknownEndAfterDateIvl.exec(this.ctx).should.be.true();
    return this.unknownEndNotAfterDateIvl.exec(this.ctx).should.be.false();
  });

  it('should correctly handle imprecision', function() {
    this.afterImpreciseDateIvl.exec(this.ctx).should.be.true();
    this.notAfterImpreciseDateIvl.exec(this.ctx).should.be.false();
    should(this.mayBeAfterImpreciseDateIvl.exec(this.ctx)).be.null;
    this.impreciseAfterDateIvl.exec(this.ctx).should.be.true();
    this.impreciseNotAfterDateIvl.exec(this.ctx).should.be.false();
    return should(this.impreciseMayBeAfterDateIvl.exec(this.ctx)).be.null;
  });

  return it('should correctly compare using the requested precision', function() {
    this.afterDayOfIvl.exec(this.ctx).should.be.true();
    this.beforeDayOfIvl.exec(this.ctx).should.be.false();
    this.startsSameDayOfIvlEnd.exec(this.ctx).should.be.false();
    this.endsSameDayOfIvlStart.exec(this.ctx).should.be.false();
    should(this.mayBeAfterDayOfImpreciseIvl.exec(this.ctx)).be.null();
    return this.mayBeBeforeDayOfImpreciseIvl.exec(this.ctx).should.be.false();
  });
});

describe('Before', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should accept intervals before it', function() {
    this.beforeIntIvl.exec(this.ctx).should.be.true();
    this.beforeRealIvl.exec(this.ctx).should.be.true();
    return this.beforeDateIvl.exec(this.ctx).should.be.true();
  });

  it('should reject intervals on or after it', function() {
    this.notBeforeIntIvl.exec(this.ctx).should.be.false();
    this.notBeforeRealIvl.exec(this.ctx).should.be.false();
    return this.notBeforeDateIvl.exec(this.ctx).should.be.false();
  });

  it('should correctly handle null endpoints (int)', function() {
    this.negInfBegBeforeIntIvl.exec(this.ctx).should.be.true();
    this.negInfBegNotBeforeIntIvl.exec(this.ctx).should.be.false();
    this.unknownBegBeforeIntIvl.exec(this.ctx).should.be.true();
    this.unknownBegNotBeforeIntIvl.exec(this.ctx).should.be.false();
    this.posInfEndNotBeforeIntIvl.exec(this.ctx).should.be.false();
    should(this.unknownEndMayBeBeforeIntIvl.exec(this.ctx)).be.null;
    return this.unknownEndNotBeforeIntIvl.exec(this.ctx).should.be.false();
  });

  it('should correctly handle null endpoints (date)', function() {
    this.negInfBegBeforeDateIvl.exec(this.ctx).should.be.true();
    this.negInfBegNotBeforeDateIvl.exec(this.ctx).should.be.false();
    this.unknownBegBeforeDateIvl.exec(this.ctx).should.be.true();
    this.unknownBegNotBeforeDateIvl.exec(this.ctx).should.be.false();
    this.posInfEndNotBeforeDateIvl.exec(this.ctx).should.be.false();
    should(this.unknownEndMayBeBeforeDateIvl.exec(this.ctx)).be.null;
    return this.unknownEndNotBeforeDateIvl.exec(this.ctx).should.be.false();
  });

  it('should correctly handle imprecision', function() {
    this.beforeImpreciseDateIvl.exec(this.ctx).should.be.true();
    this.notBeforeImpreciseDateIvl.exec(this.ctx).should.be.false();
    should(this.mayBeBeforeImpreciseDateIvl.exec(this.ctx)).be.null;
    this.impreciseBeforeDateIvl.exec(this.ctx).should.be.true();
    this.impreciseNotBeforeDateIvl.exec(this.ctx).should.be.false();
    return should(this.impreciseMayBeBeforeDateIvl.exec(this.ctx)).be.null;
  });

  return it('should correctly compare using the requested precision', function() {
    this.afterDayOfIvl.exec(this.ctx).should.be.false();
    this.beforeDayOfIvl.exec(this.ctx).should.be.true();
    this.startsSameDayOfIvlEnd.exec(this.ctx).should.be.false();
    this.endsSameDayOfIvlStart.exec(this.ctx).should.be.false();
    this.mayBeAfterDayOfImpreciseIvl.exec(this.ctx).should.be.false();
    return should(this.mayBeBeforeDayOfImpreciseIvl.exec(this.ctx)).be.null();
  });
});

describe('Meets', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should accept intervals meeting after it', function() {
    this.meetsBeforeIntIvl.exec(this.ctx).should.be.true();
    this.meetsBeforeRealIvl.exec(this.ctx).should.be.true();
    return this.meetsBeforeDateIvl.exec(this.ctx).should.be.true();
  });

  it('should accept intervals meeting before it', function() {
    this.meetsAfterIntIvl.exec(this.ctx).should.be.true();
    this.meetsAfterRealIvl.exec(this.ctx).should.be.true();
    return this.meetsAfterDateIvl.exec(this.ctx).should.be.true();
  });

  it('should reject intervals not meeting it', function() {
    this.notMeetsIntIvl.exec(this.ctx).should.be.false();
    this.notMeetsRealIvl.exec(this.ctx).should.be.false();
    return this.notMeetsDateIvl.exec(this.ctx).should.be.false();
  });

  it('should correctly handle null endpoints (int)', function() {
    this.negInfBegMeetsBeforeIntIvl.exec(this.ctx).should.be.true();
    this.negInfBegNotMeetsIntIvl.exec(this.ctx).should.be.false();
    this.intIvlNotMeetsNegInfBeg.exec(this.ctx).should.be.false();
    this.unknownBegMeetsBeforeIntIvl.exec(this.ctx).should.be.true();
    should(this.unknownBegMayMeetAfterIntIvl.exec(this.ctx)).be.null;
    this.unknownBegNotMeetsIntIvl.exec(this.ctx).should.be.false();
    should(this.intIvlMayMeetBeforeUnknownBeg.exec(this.ctx)).be.null;
    this.posInfEndMeetsAfterIntIvl.exec(this.ctx).should.be.true();
    this.posInfEndNotMeetsIntIvl.exec(this.ctx).should.be.false();
    this.intIvlNotMeetsPosInfEnd.exec(this.ctx).should.be.false();
    this.unknownEndMeetsAfterIntIvl.exec(this.ctx).should.be.true();
    should(this.unknownEndMayMeetBeforeIntIvl.exec(this.ctx)).be.null;
    this.unknownEndNotMeetsIntIvl.exec(this.ctx).should.be.false();
    return should(this.intIvlMayMeetAfterUnknownEnd.exec(this.ctx)).be.null;
  });

  it('should correctly handle null endpoints (date)', function() {
    this.negInfBegMeetsBeforeDateIvl.exec(this.ctx).should.be.true();
    this.negInfBegNotMeetsDateIvl.exec(this.ctx).should.be.false();
    this.dateIvlNotMeetsNegInfBeg.exec(this.ctx).should.be.false();
    this.unknownBegMeetsBeforeDateIvl.exec(this.ctx).should.be.true();
    should(this.unknownBegMayMeetAfterDateIvl.exec(this.ctx)).be.null;
    this.unknownBegNotMeetsDateIvl.exec(this.ctx).should.be.false();
    should(this.dateIvlMayMeetBeforeUnknownBeg.exec(this.ctx)).be.null;
    this.posInfEndMeetsAfterDateIvl.exec(this.ctx).should.be.true();
    this.posInfEndNotMeetsDateIvl.exec(this.ctx).should.be.false();
    this.dateIvlNotMeetsPosInfEnd.exec(this.ctx).should.be.false();
    this.unknownEndMeetsAfterDateIvl.exec(this.ctx).should.be.true();
    should(this.unknownEndMayMeetBeforeDateIvl.exec(this.ctx)).be.null;
    this.unknownEndNotMeetsDateIvl.exec(this.ctx).should.be.false();
    return should(this.dateIvlMayMeetAfterUnknownEnd.exec(this.ctx)).be.null;
  });

  it('should correctly handle imprecision', function() {
    should(this.mayMeetAfterImpreciseDateIvl.exec(this.ctx)).be.null;
    should(this.mayMeetBeforeImpreciseDateIvl.exec(this.ctx)).be.null;
    this.notMeetsImpreciseDateIvl.exec(this.ctx).should.be.false();
    should(this.impreciseMayMeetAfterDateIvl.exec(this.ctx)).be.null;
    should(this.impreciseMayMeetBeforeDateIvl.exec(this.ctx)).be.null;
    return this.impreciseNotMeetsDateIvl.exec(this.ctx).should.be.false();
  });

  return it('should correctly compare using the requested precision', function() {
    this.meetsAfterDayOfIvl.exec(this.ctx).should.be.true();
    this.meetsBeforeDayOfIvl.exec(this.ctx).should.be.true();
    this.notMeetsDayOfIvl.exec(this.ctx).should.be.false();
    this.notMeetsDayOfImpreciseIVL.exec(this.ctx).should.be.false();
    should(this.mayMeetAfterDayOfImpreciseIvl.exec(this.ctx)).be.null();
    return should(this.mayMeetBeforeDayOfImpreciseIvl.exec(this.ctx)).be.null();
  });
});

describe('MeetsAfter', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should accept intervals meeting before it', function() {
    this.meetsAfterIntIvl.exec(this.ctx).should.be.true();
    this.meetsAfterRealIvl.exec(this.ctx).should.be.true();
    return this.meetsAfterDateIvl.exec(this.ctx).should.be.true();
  });

  it('should reject intervals meeting after it', function() {
    this.meetsBeforeIntIvl.exec(this.ctx).should.be.false();
    this.meetsBeforeRealIvl.exec(this.ctx).should.be.false();
    return this.meetsBeforeDateIvl.exec(this.ctx).should.be.false();
  });

  it('should reject intervals not meeting it', function() {
    this.notMeetsIntIvl.exec(this.ctx).should.be.false();
    this.notMeetsRealIvl.exec(this.ctx).should.be.false();
    return this.notMeetsDateIvl.exec(this.ctx).should.be.false();
  });

  it('should correctly handle null endpoints (int)', function() {
    this.negInfBegMeetsBeforeIntIvl.exec(this.ctx).should.be.false();
    this.negInfBegNotMeetsIntIvl.exec(this.ctx).should.be.false();
    this.intIvlNotMeetsNegInfBeg.exec(this.ctx).should.be.false();
    this.unknownBegMeetsBeforeIntIvl.exec(this.ctx).should.be.false();
    should(this.unknownBegMayMeetAfterIntIvl.exec(this.ctx)).be.null;
    this.unknownBegNotMeetsIntIvl.exec(this.ctx).should.be.false();
    this.intIvlMayMeetBeforeUnknownBeg.exec(this.ctx).should.be.false();
    this.posInfEndMeetsAfterIntIvl.exec(this.ctx).should.be.true();
    this.posInfEndNotMeetsIntIvl.exec(this.ctx).should.be.false();
    this.intIvlNotMeetsPosInfEnd.exec(this.ctx).should.be.false();
    this.unknownEndMeetsAfterIntIvl.exec(this.ctx).should.be.true();
    this.unknownEndMayMeetBeforeIntIvl.exec(this.ctx).should.be.false();
    this.unknownEndNotMeetsIntIvl.exec(this.ctx).should.be.false();
    return should(this.intIvlMayMeetAfterUnknownEnd.exec(this.ctx)).be.null;
  });

  it('should correctly handle null endpoints (date)', function() {
    this.negInfBegMeetsBeforeDateIvl.exec(this.ctx).should.be.false();
    this.negInfBegNotMeetsDateIvl.exec(this.ctx).should.be.false();
    this.dateIvlNotMeetsNegInfBeg.exec(this.ctx).should.be.false();
    this.unknownBegMeetsBeforeDateIvl.exec(this.ctx).should.be.false();
    should(this.unknownBegMayMeetAfterDateIvl.exec(this.ctx)).be.null;
    this.unknownBegNotMeetsDateIvl.exec(this.ctx).should.be.false();
    this.dateIvlMayMeetBeforeUnknownBeg.exec(this.ctx).should.be.false();
    this.posInfEndMeetsAfterDateIvl.exec(this.ctx).should.be.true();
    this.posInfEndNotMeetsDateIvl.exec(this.ctx).should.be.false();
    this.dateIvlNotMeetsPosInfEnd.exec(this.ctx).should.be.false();
    this.unknownEndMeetsAfterDateIvl.exec(this.ctx).should.be.true();
    this.unknownEndMayMeetBeforeDateIvl.exec(this.ctx).should.be.false();
    this.unknownEndNotMeetsDateIvl.exec(this.ctx).should.be.false();
    return should(this.dateIvlMayMeetAfterUnknownEnd.exec(this.ctx)).be.null;
  });

  it('should correctly handle imprecision', function() {
    should(this.mayMeetAfterImpreciseDateIvl.exec(this.ctx)).be.null;
    this.mayMeetBeforeImpreciseDateIvl.exec(this.ctx).should.be.false();
    this.notMeetsImpreciseDateIvl.exec(this.ctx).should.be.false();
    should(this.impreciseMayMeetAfterDateIvl.exec(this.ctx)).be.null;
    this.impreciseMayMeetBeforeDateIvl.exec(this.ctx).should.be.false();
    return this.impreciseNotMeetsDateIvl.exec(this.ctx).should.be.false();
  });

  return it('should correctly compare using the requested precision', function() {
    this.meetsAfterDayOfIvl.exec(this.ctx).should.be.true();
    this.meetsBeforeDayOfIvl.exec(this.ctx).should.be.false();
    this.notMeetsDayOfIvl.exec(this.ctx).should.be.false();
    this.notMeetsDayOfImpreciseIVL.exec(this.ctx).should.be.false();
    should(this.mayMeetAfterDayOfImpreciseIvl.exec(this.ctx)).be.null();
    return this.mayMeetBeforeDayOfImpreciseIvl.exec(this.ctx).should.be.false();
  });
});

describe('MeetsBefore', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should accept intervals meeting after it', function() {
    this.meetsBeforeIntIvl.exec(this.ctx).should.be.true();
    this.meetsBeforeRealIvl.exec(this.ctx).should.be.true();
    return this.meetsBeforeDateIvl.exec(this.ctx).should.be.true();
  });

  it('should reject intervals meeting before it', function() {
    this.meetsAfterIntIvl.exec(this.ctx).should.be.false();
    this.meetsAfterRealIvl.exec(this.ctx).should.be.false();
    return this.meetsAfterDateIvl.exec(this.ctx).should.be.false();
  });

  it('should reject intervals not meeting it', function() {
    this.notMeetsIntIvl.exec(this.ctx).should.be.false();
    this.notMeetsRealIvl.exec(this.ctx).should.be.false();
    return this.notMeetsDateIvl.exec(this.ctx).should.be.false();
  });

  it('should correctly handle null endpoints (int)', function() {
    this.negInfBegMeetsBeforeIntIvl.exec(this.ctx).should.be.true();
    this.negInfBegNotMeetsIntIvl.exec(this.ctx).should.be.false();
    this.intIvlNotMeetsNegInfBeg.exec(this.ctx).should.be.false();
    this.unknownBegMeetsBeforeIntIvl.exec(this.ctx).should.be.true();
    this.unknownBegMayMeetAfterIntIvl.exec(this.ctx).should.be.false();
    this.unknownBegNotMeetsIntIvl.exec(this.ctx).should.be.false();
    should(this.intIvlMayMeetBeforeUnknownBeg.exec(this.ctx)).be.null;
    this.posInfEndMeetsAfterIntIvl.exec(this.ctx).should.be.false();
    this.posInfEndNotMeetsIntIvl.exec(this.ctx).should.be.false();
    this.intIvlNotMeetsPosInfEnd.exec(this.ctx).should.be.false();
    this.unknownEndMeetsAfterIntIvl.exec(this.ctx).should.be.false();
    should(this.unknownEndMayMeetBeforeIntIvl.exec(this.ctx)).be.null;
    this.unknownEndNotMeetsIntIvl.exec(this.ctx).should.be.false();
    return this.intIvlMayMeetAfterUnknownEnd.exec(this.ctx).should.be.false();
  });

  it('should correctly handle null endpoints (date)', function() {
    this.negInfBegMeetsBeforeDateIvl.exec(this.ctx).should.be.true();
    this.negInfBegNotMeetsDateIvl.exec(this.ctx).should.be.false();
    this.dateIvlNotMeetsNegInfBeg.exec(this.ctx).should.be.false();
    this.unknownBegMeetsBeforeDateIvl.exec(this.ctx).should.be.true();
    this.unknownBegMayMeetAfterDateIvl.exec(this.ctx).should.be.false();
    this.unknownBegNotMeetsDateIvl.exec(this.ctx).should.be.false();
    should(this.dateIvlMayMeetBeforeUnknownBeg.exec(this.ctx)).be.null;
    this.posInfEndMeetsAfterDateIvl.exec(this.ctx).should.be.false();
    this.posInfEndNotMeetsDateIvl.exec(this.ctx).should.be.false();
    this.dateIvlNotMeetsPosInfEnd.exec(this.ctx).should.be.false();
    this.unknownEndMeetsAfterDateIvl.exec(this.ctx).should.be.false();
    should(this.unknownEndMayMeetBeforeDateIvl.exec(this.ctx)).be.null;
    this.unknownEndNotMeetsDateIvl.exec(this.ctx).should.be.false();
    return this.dateIvlMayMeetAfterUnknownEnd.exec(this.ctx).should.be.false();
  });

  it('should correctly handle imprecision', function() {
    this.mayMeetAfterImpreciseDateIvl.exec(this.ctx).should.be.false();
    should(this.mayMeetBeforeImpreciseDateIvl.exec(this.ctx)).be.null;
    this.notMeetsImpreciseDateIvl.exec(this.ctx).should.be.false();
    this.impreciseMayMeetAfterDateIvl.exec(this.ctx).should.be.false();
    should(this.impreciseMayMeetBeforeDateIvl.exec(this.ctx)).be.null;
    return this.impreciseNotMeetsDateIvl.exec(this.ctx).should.be.false();
  });

  return it('should correctly compare using the requested precision', function() {
    this.meetsAfterDayOfIvl.exec(this.ctx).should.be.false();
    this.meetsBeforeDayOfIvl.exec(this.ctx).should.be.true();
    this.notMeetsDayOfIvl.exec(this.ctx).should.be.false();
    this.notMeetsDayOfImpreciseIVL.exec(this.ctx).should.be.false();
    this.mayMeetAfterDayOfImpreciseIvl.exec(this.ctx).should.be.false();
    return should(this.mayMeetBeforeDayOfImpreciseIvl.exec(this.ctx)).be.null();
  });
});

describe('Overlaps', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should accept overlaps (integer)', function() {
    this.overlapsBeforeIntIvl.exec(this.ctx).should.be.true();
    this.overlapsAfterIntIvl.exec(this.ctx).should.be.true();
    return this.overlapsBoundaryIntIvl.exec(this.ctx).should.be.true();
  });

  it('should accept overlaps (real)', function() {
    this.overlapsBeforeRealIvl.exec(this.ctx).should.be.true();
    this.overlapsAfterRealIvl.exec(this.ctx).should.be.true();
    return this.overlapsBoundaryRealIvl.exec(this.ctx).should.be.true();
  });

  it('should reject non-overlaps (integer)', function() {
    return this.noOverlapsIntIvl.exec(this.ctx).should.be.false();
  });

  return it('should reject non-overlaps (real)', function() {
    return this.noOverlapsRealIvl.exec(this.ctx).should.be.false();
  });
});

describe('OverlapsDateTime', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should accept overlaps', function() {
    this.overlapsBefore.exec(this.ctx).should.be.true();
    this.overlapsAfter.exec(this.ctx).should.be.true();
    this.overlapsContained.exec(this.ctx).should.be.true();
    return this.overlapsContains.exec(this.ctx).should.be.true();
  });

  it('should accept imprecise overlaps', function() {
    return this.impreciseOverlap.exec(this.ctx).should.be.true();
  });

  it('should reject non-overlaps', function() {
    return this.noOverlap.exec(this.ctx).should.be.false();
  });

  it('should reject imprecise non-overlaps', function() {
    return this.noImpreciseOverlap.exec(this.ctx).should.be.false();
  });

  it('should return null for imprecise overlaps that are unknown', function() {
    return should(this.unknownOverlap.exec(this.ctx)).be.null;
  });

  return it('should correctly compare using the requested precision', function() {
    // NOTE: Some assertions commented out because cql-to-elm is WRONGLY translating 'overlaps' to 'OverlapsAfter'!
    //@overlapsBeforeDayOfIvlEdge.exec(@ctx).should.be.true()
    this.overlapsAfterDayOfIvlEdge.exec(this.ctx).should.be.true();
    this.overlapsContainsDayOfIvl.exec(this.ctx).should.be.true();
    //@overlapsContainedByDayOfIvl.exec(@ctx).should.be.true()
    this.notOverlapsDayOfIvl.exec(this.ctx).should.be.false();
    this.overlapsAfterDayOfImpreciseInterval.exec(this.ctx).should.be.true();
    //should(@mayOverlapBeforeDayOfImpreciseIvl.exec(@ctx)).be.null()
    return should(this.mayOverlapAfterDayOfImpreciseIvl.exec(this.ctx)).be.null();
  });
});

describe('OverlapsAfter', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should accept overlaps that are after (integer)', function() {
    this.overlapsAfterIntIvl.exec(this.ctx).should.be.true();
    return this.overlapsBoundaryIntIvl.exec(this.ctx).should.be.true();
  });

  it('should accept overlaps that are after (real)', function() {
    this.overlapsAfterRealIvl.exec(this.ctx).should.be.true();
    return this.overlapsBoundaryRealIvl.exec(this.ctx).should.be.true();
  });

  it('should reject overlaps that are before (integer)', function() {
    return this.overlapsBeforeIntIvl.exec(this.ctx).should.be.false();
  });

  it('should reject overlaps that are before (real)', function() {
    return this.overlapsBeforeRealIvl.exec(this.ctx).should.be.false();
  });

  it('should reject non-overlaps (integer)', function() {
    return this.noOverlapsIntIvl.exec(this.ctx).should.be.false();
  });

  return it('should reject non-overlaps (real)', function() {
    return this.noOverlapsRealIvl.exec(this.ctx).should.be.false();
  });
});

describe('OverlapsAfterDateTime', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should accept overlaps that are after', function() {
    this.overlapsAfter.exec(this.ctx).should.be.true();
    return this.overlapsContains.exec(this.ctx).should.be.true();
  });

  it('should accept imprecise overlaps that are after', function() {
    return this.impreciseOverlapAfter.exec(this.ctx).should.be.true();
  });

  it('should reject overlaps that are not before', function() {
    this.overlapsBefore.exec(this.ctx).should.be.false();
    return this.overlapsContained.exec(this.ctx).should.be.false();
  });

  it('should reject imprecise overlaps that are not before', function() {
    return this.impreciseOverlapBefore.exec(this.ctx).should.be.false();
  });

  it('should reject non-overlaps', function() {
    return this.noOverlap.exec(this.ctx).should.be.false();
  });

  it('should reject imprecise non-overlaps', function() {
    return this.noImpreciseOverlap.exec(this.ctx).should.be.false();
  });

  it('should return null for imprecise overlaps that are unknown', function() {
    return should(this.unknownOverlap.exec(this.ctx)).be.null;
  });

  return it('should correctly compare using the requested precision', function() {
    this.overlapsBeforeDayOfIvlEdge.exec(this.ctx).should.be.false();
    this.overlapsAfterDayOfIvlEdge.exec(this.ctx).should.be.true();
    this.overlapsContainsDayOfIvl.exec(this.ctx).should.be.true();
    this.overlapsContainedByDayOfIvl.exec(this.ctx).should.be.false();
    this.notOverlapsDayOfIvl.exec(this.ctx).should.be.false();
    this.overlapsAfterDayOfImpreciseInterval.exec(this.ctx).should.be.true();
    this.mayOverlapBeforeDayOfImpreciseIvl.exec(this.ctx).should.be.false();
    return should(this.mayOverlapAfterDayOfImpreciseIvl.exec(this.ctx)).be.null();
  });
});

describe('OverlapsBefore', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should accept overlaps that are before (integer)', function() {
    this.overlapsBeforeIntIvl.exec(this.ctx).should.be.true();
    return this.overlapsBoundaryIntIvl.exec(this.ctx).should.be.true();
  });

  it('should accept overlaps that are before (real)', function() {
    this.overlapsBeforeRealIvl.exec(this.ctx).should.be.true();
    return this.overlapsBoundaryRealIvl.exec(this.ctx).should.be.true();
  });

  it('should reject overlaps that are after (integer)', function() {
    return this.overlapsAfterIntIvl.exec(this.ctx).should.be.false();
  });

  it('should reject overlaps that are after (real)', function() {
    return this.overlapsAfterRealIvl.exec(this.ctx).should.be.false();
  });

  it('should reject non-overlaps (integer)', function() {
    return this.noOverlapsIntIvl.exec(this.ctx).should.be.false();
  });

  return it('should reject non-overlaps (real)', function() {
    return this.noOverlapsRealIvl.exec(this.ctx).should.be.false();
  });
});

describe('OverlapsBeforeDateTime', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should accept overlaps that are before', function() {
    this.overlapsBefore.exec(this.ctx).should.be.true();
    return this.overlapsContains.exec(this.ctx).should.be.true();
  });

  it('should accept imprecise overlaps that are before', function() {
    return this.impreciseOverlapBefore.exec(this.ctx).should.be.true();
  });

  it('should reject overlaps that are not before', function() {
    this.overlapsAfter.exec(this.ctx).should.be.false();
    return this.overlapsContained.exec(this.ctx).should.be.false();
  });

  it('should reject imprecise overlaps that are not before', function() {
    return this.impreciseOverlapAfter.exec(this.ctx).should.be.false();
  });

  it('should reject non-overlaps', function() {
    return this.noOverlap.exec(this.ctx).should.be.false();
  });

  it('should reject imprecise non-overlaps', function() {
    return this.noImpreciseOverlap.exec(this.ctx).should.be.false();
  });

  it('should return null for imprecise overlaps that are unknown', function() {
    return should(this.unknownOverlap.exec(this.ctx)).be.null;
  });

  return it('should correctly compare using the requested precision', function() {
    this.overlapsBeforeDayOfIvlEdge.exec(this.ctx).should.be.true();
    this.overlapsAfterDayOfIvlEdge.exec(this.ctx).should.be.false();
    this.overlapsContainsDayOfIvl.exec(this.ctx).should.be.true();
    this.overlapsContainedByDayOfIvl.exec(this.ctx).should.be.false();
    this.notOverlapsDayOfIvl.exec(this.ctx).should.be.false();
    this.overlapsAfterDayOfImpreciseInterval.exec(this.ctx).should.be.false();
    should(this.mayOverlapBeforeDayOfImpreciseIvl.exec(this.ctx)).be.null();
    return this.mayOverlapAfterDayOfImpreciseIvl.exec(this.ctx).should.be.false();
  });
});

describe('Width', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should calculate the width of integer intervals', function() {
    this.intWidth.exec(this.ctx).should.equal(7);
    return this.intOpenWidth.exec(this.ctx).should.equal(5);
  });

  it('should calculate the width of real intervals', function() {
    this.realWidth.exec(this.ctx).should.equal(3.33);
    return this.realOpenWidth.exec(this.ctx).should.equal(3.32999998);
  });

  it('should calculate the width of infinite intervals', function() {
    this.intWidthThreeToMax.exec(this.ctx).should.equal(Math.pow(2,31)-4);
    return this.intWidthMinToThree.exec(this.ctx).should.equal(Math.pow(2,31)+3);
  });

  return it('should calculate the width of infinite intervals', function() {
    should(this.intWidthThreeToUnknown.exec(this.ctx)).be.null;
    return should(this.intWidthUnknownToThree.exec(this.ctx)).be.null;
  });
});

describe('Start', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  return it('should execute as the start of the interval', function() {
    return this.foo.exec(this.ctx).should.eql(new DateTime(2012, 1, 1));
  });
});

describe('End', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  return it('should execute as the end of the interval', function() {
    return this.foo.exec(this.ctx).should.eql(new DateTime(2013, 1, 1));
  });
});

describe('IntegerIntervalUnion', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should properly calculate open and closed unions', function() {
    const x = this.intFullInterval.exec(this.ctx);
    let y = this.intClosedUnionClosed.exec(this.ctx);
    y.equals(x).should.be.true();

    y = this.intClosedUnionOpen.exec(this.ctx);
    y.contains(0).should.be.true();
    y.contains(10).should.be.false();

    y = this.intOpenUnionOpen.exec(this.ctx);
    y.contains(0).should.be.false();
    y.contains(10).should.be.false();

    y = this.intOpenUnionClosed.exec(this.ctx);
    y.contains(0).should.be.false();
    return y.contains(10).should.be.true();
  });

  it('should properly calculate sameAs unions', function() {
    const x = this.intFullInterval.exec(this.ctx);
    const y = this.intSameAsUnion.exec(this.ctx);
    return y.equals(x).should.be.true();
  });

  it('should properly calculate before/after unions', function() {
    return should(this.intBeforeUnion.exec(this.ctx)).be.null;
  });

  it('should properly calculate meets unions', function() {
    const x = this.intFullInterval.exec(this.ctx);
    const y = this.intMeetsUnion.exec(this.ctx);
    return y.equals(x).should.be.true();
  });

  it('should properly calculate left/right overlapping unions', function() {
    const x = this.intFullInterval.exec(this.ctx);
    const y = this.intOverlapsUnion.exec(this.ctx);
    return y.equals(x).should.be.true();
  });

  it('should properly calculate begins/begun by unions', function() {
    const x = this.intFullInterval.exec(this.ctx);
    const y = this.intBeginsUnion.exec(this.ctx);
    return y.equals(x).should.be.true();
  });

  it('should properly calculate includes/included by unions', function() {
    const x = this.intFullInterval.exec(this.ctx);
    const y = this.intDuringUnion.exec(this.ctx);
    return y.equals(x).should.be.true();
  });

  return it('should properly calculate ends/ended by unions', function() {
    const x = this.intFullInterval.exec(this.ctx);
    const y = this.intEndsUnion.exec(this.ctx);
    return y.equals(x).should.be.true();
  });
});

// TODO
// it 'should properly handle imprecision', ->

describe('DateTimeIntervalUnion', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should properly calculate open and closed unions', function() {
    const x = this.dateTimeFullInterval.exec(this.ctx);
    let y = this.dateTimeClosedUnionClosed.exec(this.ctx);
    y.equals(x).should.be.true();

    const a = new DateTime(2012, 1, 1, 0, 0, 0, 0);
    const b = new DateTime(2013, 1, 1, 0, 0, 0, 0);

    y = this.dateTimeClosedUnionOpen.exec(this.ctx);
    y.contains(a).should.be.true();
    y.contains(b).should.be.false();

    y = this.dateTimeOpenUnionOpen.exec(this.ctx);
    y.contains(a).should.be.false();
    y.contains(b).should.be.false();

    y = this.dateTimeOpenUnionClosed.exec(this.ctx);
    y.contains(a).should.be.false();
    return y.contains(b).should.be.true();
  });

  it('should properly calculate sameAs unions', function() {
    const x = this.dateTimeFullInterval.exec(this.ctx);
    const y = this.dateTimeSameAsUnion.exec(this.ctx);
    return y.equals(x).should.be.true();
  });

  it('should properly calculate before/after unions', function() {
    return should(this.dateTimeBeforeUnion.exec(this.ctx)).be.null;
  });

  it('should properly calculate meets unions', function() {
    const x = this.dateTimeFullInterval.exec(this.ctx);
    const y = this.dateTimeMeetsUnion.exec(this.ctx);
    return y.equals(x).should.be.true();
  });

  it('should properly calculate left/right overlapping unions', function() {
    const x = this.dateTimeFullInterval.exec(this.ctx);
    const y = this.dateTimeOverlapsUnion.exec(this.ctx);
    return y.equals(x).should.be.true();
  });

  it('should properly calculate begins/begun by unions', function() {
    const x = this.dateTimeFullInterval.exec(this.ctx);
    const y = this.dateTimeBeginsUnion.exec(this.ctx);
    return y.equals(x).should.be.true();
  });

  it('should properly calculate includes/included by unions', function() {
    const x = this.dateTimeFullInterval.exec(this.ctx);
    const y = this.dateTimeDuringUnion.exec(this.ctx);
    return y.equals(x).should.be.true();
  });

  return it('should properly calculate ends/ended by unions', function() {
    const x = this.dateTimeFullInterval.exec(this.ctx);
    const y = this.dateTimeEndsUnion.exec(this.ctx);
    return y.equals(x).should.be.true();
  });
});

// TODO
// it 'should properly handle imprecision', ->

describe('IntegerIntervalExcept', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should properly calculate sameAs except', function() {
    return should(this.intSameAsExcept.exec(this.ctx)).be.null;
  });

  it('should properly calculate before/after except', function() {
    return this.intBeforeExcept.exec(this.ctx).should.eql(new Interval(0,4));
  });

  it('should properly calculate meets except', function() {
    const x = this.intHalfInterval.exec(this.ctx);
    const y = this.intMeetsExcept.exec(this.ctx);
    return y.equals(x).should.be.true();
  });

  it('should properly calculate left/right overlapping except', function() {
    const x = this.intHalfInterval.exec(this.ctx);
    const y = this.intOverlapsExcept.exec(this.ctx);
    return y.equals(x).should.be.true();
  });

  it('should properly calculate begins/begun by except', function() {
    return should(this.intBeginsExcept.exec(this.ctx)).be.null;
  });

  it('should properly calculate includes/included by except', function() {
    return should(this.intDuringExcept.exec(this.ctx)).be.null;
  });

  return it('should properly calculate ends/ended by except', function() {
    return should(this.intEndsExcept.exec(this.ctx)).be.null;
  });
});

// TODO
// it 'should properly handle imprecision', ->

describe('DateTimeIntervalExcept', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should properly calculate sameAs except', function() {
    return should(this.dateTimeSameAsExcept.exec(this.ctx)).be.null;
  });

  it('should properly calculate before/after except', function() {
    return this.dateTimeBeforeExcept.exec(this.ctx).should.eql(new Interval(new DateTime(2012, 1, 1, 0, 0, 0, 0), new DateTime(2012, 4, 1, 0, 0, 0, 0)));
  });

  it('should properly calculate meets except', function() {
    const x = this.dateTimeHalfInterval.exec(this.ctx);
    const y = this.dateTimeMeetsExcept.exec(this.ctx);
    return y.equals(x).should.be.true();
  });

  it('should properly calculate left/right overlapping except', function() {
    const x = this.dateTimeHalfInterval.exec(this.ctx);
    const y = this.dateTimeOverlapsExcept.exec(this.ctx);
    return y.equals(x).should.be.true();
  });

  it('should properly calculate begins/begun by except', function() {
    return should(this.dateTimeBeginsExcept.exec(this.ctx)).be.null;
  });

  it('should properly calculate includes/included by except', function() {
    return should(this.dateTimeDuringExcept.exec(this.ctx)).be.null;
  });

  return it('should properly calculate ends/ended by except', function() {
    return should(this.dateTimeEndsExcept.exec(this.ctx)).be.null;
  });
});

// TODO
// it 'should properly handle imprecision', ->

describe('IntegerIntervalIntersect', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should properly calculate sameAs intersect', function() {
    const x = this.intSameAsIntersect.exec(this.ctx);
    const y = this.intFullInterval.exec(this.ctx);
    return x.equals(y).should.be.true();
  });

  it('should properly calculate before/after intersect', function() {
    return should(this.intBeforeIntersect.exec(this.ctx)).be.null;
  });

  it('should properly calculate meets intersect', function() {
    const x = this.intMeetsInterval.exec(this.ctx);
    const y = this.intMeetsIntersect.exec(this.ctx);
    return y.equals(x).should.be.true();
  });

  it('should properly calculate left/right overlapping intersect', function() {
    const x = this.intOverlapsInterval.exec(this.ctx);
    const y = this.intOverlapsIntersect.exec(this.ctx);
    return y.equals(x).should.be.true();
  });

  it('should properly calculate begins/begun by intersect', function() {
    const x = this.intBeginsInterval.exec(this.ctx);
    const y = this.intBeginsIntersect.exec(this.ctx);
    return y.equals(x).should.be.true();
  });

  it('should properly calculate includes/included by intersect', function() {
    const x = this.intDuringInterval.exec(this.ctx);
    const y = this.intDuringIntersect.exec(this.ctx);
    return y.equals(x).should.be.true();
  });

  return it('should properly calculate ends/ended by intersect', function() {
    const x = this.intEndsInterval.exec(this.ctx);
    const y = this.intEndsIntersect.exec(this.ctx);
    return y.equals(x).should.be.true();
  });
});

describe('DateTimeIntervalIntersect', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('should properly calculate sameAs intersect', function() {
    const x = this.dateTimeSameAsIntersect.exec(this.ctx);
    const y = this.dateTimeFullInterval.exec(this.ctx);
    return x.equals(y).should.be.true();
  });

  it('should properly calculate before/after intersect', function() {
    return should(this.dateTimeBeforeIntersect.exec(this.ctx)).be.null;
  });

  it('should properly calculate meets intersect', function() {
    const x = this.dateTimeMeetsInterval.exec(this.ctx);
    const y = this.dateTimeMeetsIntersect.exec(this.ctx);
    return y.equals(x).should.be.true();
  });

  it('should properly calculate left/right overlapping intersect', function() {
    const x = this.dateTimeOverlapsInterval.exec(this.ctx);
    const y = this.dateTimeOverlapsIntersect.exec(this.ctx);
    return y.equals(x).should.be.true();
  });

  it('should properly calculate begins/begun by intersect', function() {
    const x = this.dateTimeBeginsInterval.exec(this.ctx);
    const y = this.dateTimeBeginsIntersect.exec(this.ctx);
    return y.equals(x).should.be.true();
  });

  it('should properly calculate includes/included by intersect', function() {
    const x = this.dateTimeDuringInterval.exec(this.ctx);
    const y = this.dateTimeDuringIntersect.exec(this.ctx);
    return y.equals(x).should.be.true();
  });

  return it('should properly calculate ends/ended by intersect', function() {
    const x = this.dateTimeEndsInterval.exec(this.ctx);
    const y = this.dateTimeEndsIntersect.exec(this.ctx);
    return y.equals(x).should.be.true();
  });
});

// TODO: 2 tests I don't know how to write:
//   - If the argument is null, the result is null.
//   - If the list of intervals contains nulls, they will be excluded from the resulting list.
describe('IntegerIntervalCollapse', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('empty interval collapses to empty', function() {
    return this.intCollapseEmpty.exec(this.ctx).should.eql(this.intEmptyIntervalList.exec(this.ctx));
  });

  it('single interval list collapse to self', function() {
    return this.intCollapseSingleInterval.exec(this.ctx).should.eql(this.int1_10IntervalList.exec(this.ctx));
  });

  it('disjoint intervals list collapses to ordered self', function() {
    this.intCollapseDisjoint.exec(this.ctx).should.eql(this.intTwoItemDisjointList.exec(this.ctx));
    return this.intCollapseDisjointReversed.exec(this.ctx).should.eql(this.intTwoItemDisjointList.exec(this.ctx));
  });

  it('adjacent intervals list combines', function() {
    return this.intCollapseAdjacent.exec(this.ctx).should.eql(this.int1_15IntervalList.exec(this.ctx));
  });

  return it('overlapping intervals list combine', function() {
    this.intCollapseOverlap.exec(this.ctx).should.eql(this.int1_12IntervalList.exec(this.ctx));
    this.intCollapseOverlapContained.exec(this.ctx).should.eql(this.int1_15IntervalList.exec(this.ctx));
    this.intCollapseOverlapContainedEdge.exec(this.ctx).should.eql(this.int1_10IntervalList.exec(this.ctx));
    this.intCollapseOverlapContainedEdge2.exec(this.ctx).should.eql(this.int1_15IntervalList.exec(this.ctx));
    return this.intCollapseOverlapMultipleCombine.exec(this.ctx).should.eql(this.int1_15IntervalList.exec(this.ctx));
  });
});

describe('DateTimeIntervalCollapse', function() {
  this.beforeEach(function() {
    return setup(this, data);
  });

  it('empty interval collapses to empty', function() {
    return this.dateTimeCollapseEmpty.exec(this.ctx).should.eql(this.dateTimeEmptyIntervalList.exec(this.ctx));
  });

  it('single interval list collapse to self', function() {
    return this.dateTimeCollapseSingleInterval.exec(this.ctx).should.eql(this.dateTime1_10IntervalList.exec(this.ctx));
  });

  it('disjoint intervals list collapses to ordered self', function() {
    this.dateTimeCollapseDisjoint.exec(this.ctx).should.eql(this.dateTimeTwoItemDisjointList.exec(this.ctx));
    return this.dateTimeCollapseDisjointReversed.exec(this.ctx).should.eql(this.dateTimeTwoItemDisjointList.exec(this.ctx));
  });

  it('adjacent intervals list combines', function() {
    return this.dateTimeCollapseAdjacent.exec(this.ctx).should.eql(this.dateTime1_15IntervalList.exec(this.ctx));
  });

  it('overlapping intervals list combine', function() {
    this.dateTimeCollapseOverlap.exec(this.ctx).should.eql(this.dateTime1_12IntervalList.exec(this.ctx));
    this.dateTimeCollapseOverlapContained.exec(this.ctx).should.eql(this.dateTime1_15IntervalList.exec(this.ctx));
    this.dateTimeCollapseOverlapContainedEdge.exec(this.ctx).should.eql(this.dateTime1_10IntervalList.exec(this.ctx));
    this.dateTimeCollapseOverlapContainedEdge2.exec(this.ctx).should.eql(this.dateTime1_15IntervalList.exec(this.ctx));
    return this.dateTimeCollapseOverlapMultipleCombine.exec(this.ctx).should.eql(this.dateTime1_15IntervalList.exec(this.ctx));
  });

  return it('throws collapsing imprecise interval', function() {
    return should(() => this.dateTimeCollapseImpreciseBoundary.exec(this.ctx)).throw('Collapse does not support imprecise dates at this time.');
  });
});
