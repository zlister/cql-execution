/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let Executor;
module.exports.Executor = (Executor = class Executor {

  constructor(library,codeService,parameters) {
    this.library = library;
    this.codeService = codeService;
    this.parameters = parameters;
  }

  withLibrary(lib) {
    this.library = lib; 
    return this;
  }

  withParameters(params) {
    this.parameters = params != null ? params : {};
    return this;
  }

  withCodeService(cs) {
    this.codeService = cs;
    return this;
  }

  exec_expression(expression, patientSource) {
    let r;
    let p;
    Results(r = new Results());
    const expr = this.library.expressions[expression];
    while (expr && (p = patientSource.currentPatient())) {
      const patient_ctx = new PatientContext(this.library,p,this.codeService,this.parameters);
      r.recordPatientResult(patient_ctx, expression, expr.execute(patient_ctx));
      patientSource.nextPatient();
    }
    return r;
  }

  exec(patientSource) {
    let r;
    Results(r = this.exec_patient_context(patientSource));
    const popContext = new PopulationContext(this.library,r,this.codeService,this.parameters);
    for (let key in this.library.expressions) {
      const expr = this.library.expressions[key];
      if (expr.context === "Population") {
       r.recordPopulationResult( key, expr.exec(popContext));
      }
    }
    return r;
  }

  exec_patient_context(patientSource) {
    let r;
    let p;
    Results(r = new Results());
    while ((p = patientSource.currentPatient())) {
      const patient_ctx = new PatientContext(this.library,p,this.codeService,this.parameters);
      for (let key in this.library.expressions) {
        const expr = this.library.expressions[key];
        if (expr.context === "Patient") {
          r.recordPatientResult(patient_ctx, key, expr.execute(patient_ctx));
        }
      }
      patientSource.nextPatient();
    }
    return r;
  }
});

var { Results } = require('./results');
var { PopulationContext,PatientContext } = require('./context');