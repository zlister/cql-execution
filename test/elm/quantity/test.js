/* eslint-disable
    no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const should = require('should');
const setup = require('../../setup');
const {Quantity} = require('../../../src/elm/quantity');

describe('Quantity', function() {
  it('should allow creation of Quantity with valid ucum units', () =>
    should.doesNotThrow(() => new Quantity({unit: 'mm', value: 42.424242}))
  );

  it('should allow creation of Quantity with valid ucum units on multiple uses of same unit', () =>
    should.doesNotThrow(function() {
      new Quantity({unit: 'cm', value: 42.424242});
      return new Quantity({unit: 'cm', value: 43.434242});
    })
  );

  it('should allow creation of Quantity with valid ucum converted time units', () =>
    should.doesNotThrow(() => new Quantity({unit: 'years', value: 3}))
  );

  it('should throw error when creating Quantity with invalid ucum units', () =>
    should.throws(() => new Quantity({unit: 'quacks', value: 42.424242}))
  );

  it('should throw error when creating Quantity with invalid ucum units on multiple uses of same unit', function() {
    should.throws(() => new Quantity({unit: 'caches', value: 42.424242}));
    return should.throws(() => new Quantity({unit: 'caches', value: 44.4242242}));
  });

  it('should allow creation of Quantity with no unit', () =>
    should.doesNotThrow(() => new Quantity({value: 9}))
  );

  return it('should allow creation of Quantity with empty string unit', () =>
    should.doesNotThrow(() => new Quantity({unit: '', value: 9}))
  );
});
