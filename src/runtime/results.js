/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let Results;
module.exports.Results = (Results = class Results {
  constructor() {
    this.patientResults = {};
    this.populationResults = {};
    this.localIdPatientResultsMap = {};
  }

  recordPatientResult(patient_ctx, resultName, result) {
    const patientId = patient_ctx.patient.id();
    if (this.patientResults[patientId] == null) { this.patientResults[patientId] = {}; }
    this.patientResults[patientId][resultName] = result;
    return this.localIdPatientResultsMap[patientId] = patient_ctx.getAllLocalIds();
  }

  recordPopulationResult(resultName, result) {
    return this.populationResults[resultName] = result;
  }
});
