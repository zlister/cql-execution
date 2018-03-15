/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const should = require('should');
const setup = require('../../setup');
const data = require('./data');


const { p1, p2 } = require('./patients');

describe('Age', function() {
  this.beforeEach(function() {
    setup(this, data, [ p1, p2 ]);
    return this.results = this.executor.withLibrary(this.lib).exec(this.patientSource);
  });

  it('should have correct patient results', function() {
    this.results.patientResults['1'].Age.should.equal(32);
    return this.results.patientResults['2'].Age.should.equal(5);
  });

  it('should have the correct population results', function() {
    return this.results.populationResults.AgeSum.should.equal(37);
  });

  return it('should be able to reference other population context expressions', function() {
    return this.results.populationResults.AgeSumRef.should.equal(37);
  });
});

        