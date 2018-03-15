/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS104: Avoid inline assignments
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const DT = require('./datatypes/datatypes');
const FHIR = require('./fhir/models');
const { typeIsArray } = require('./util/util');

const toDate = function(str) {
  if (typeof str === 'string') { return new Date(str);
  } else { return null; }
};

class Record {
  constructor(json) {
    this.json = json;
  }

  get(field) {
    return this.json[field];
  }

  getDate(field) {
    const val = this.get(field);
    if (val != null) { return DT.DateTime.parse(val); } else { return null; }
  }

  getInterval(field) {
    const val = this.get(field);
    if ((val != null) && (typeof val === 'object')) {
      const start = (val.start != null) ? DT.DateTime.parse(val.start) : null;
      const end = (val.end != null) ? DT.DateTime.parse(val.end) : null;
      return new DT.Interval(start, end);
    }
  }

  getDateOrInterval(field) {
    const val = this.get(field);
    if ((val != null) && (typeof val === 'object')) { return this.getInterval(field); } else { return this.getDate(field); }
  }

  getCode(field) {
    const val = this.get(field);
    if ((val != null) && (typeof val === 'object')) { return new DT.Code(val.code, val.system, val.version); }
  }
}

class Patient {
  constructor(json) {
    this.identifier = json.identifier;
    this.name = json.name;
    this.gender = json.gender;
    this.birthDate = (json.birthDate != null) ? DT.DateTime.parse(json.birthDate) : undefined;
    this.records = {};
    for (let r of json.records != null ? json.records : []) {
      if (this.records[r.profile] == null) { this.records[r.profile] = []; }
      this.records[r.profile].push(new Record(r));
    }
  }

  findRecords(profile) {
    if (profile === 'patient-qicore-qicore-patient') { return [this]; } else { return this.records[profile] != null ? this.records[profile] : []; }
  }
}



FHIR.Patient.prototype.records = function() {
  this._records = {};
  for (let r of this.json.records != null ? this.json.records : []) {
    if (this._records[r.profile] == null) { this._records[r.profile] = []; }
    this._records[r.profile].push(new Record(r));
  }
  return this._records;
};

FHIR.Patient.prototype.findRecords = function(profile) {
  if (profile === 'patient-qicore-qicore-patient') { return [this]; } else { let left;
  return (left = (this._bundle != null ? this._bundle.findRecords(profile) : undefined)) != null ? left : []; }
};


FHIR.Bundle.prototype.findRecords = function(profile) {
  const filtered = this.entry().filter(e=> __guard__(__guard__(__guard__(e.resource(), x2 => x2.meta()), x1 => x1.profile()), x => x.indexOf(profile)) > -1);
  return (() => {
    const result = [];
    for (let e of filtered) {
      const r = e.resource();
      r._bundle = this;
      result.push(r);
    }
    return result;
  })();
};

FHIR.Bundle.prototype.findRecord = function(profile) {
  return this.findRecords(profile)[0];
};

FHIR.Base.prototype.get = function(field) {
  return (this[field] != null ? this[field].call(this) : undefined);
};

FHIR.Base.prototype.getDate = function(field) {
  const val = this.get(field);
  if (val instanceof DT.DateTime) {
    return val;
  } else if (typeof val === "string") {
    return DT.DateTime.parse(val);
  }
};

FHIR.Base.prototype.getInterval= function(field) {
  const val = this.get(field);
  if (val(instannceOf(FHIR.Period))) {
    return this.periodToInterval(val);
  }
};

FHIR.Base.prototype.getDateOrInterval = function(field) {
  const val = this.get(field);
  if (val instanceof FHIR.Period) {
    return this.periodToInterval(val);
  } else if (typeof val === "string") {
    return DT.DateTime.parse(val);
  } else if (val instanceof  DT.DateTime) {
    return val;
  }
};

FHIR.Base.prototype.getCode = function(field) {
  const val = this.get(field);
  return this.toCode(val);
};

FHIR.Base.prototype.toCode = function(val) {
  if (typeIsArray(val)) {
    return val.map((c) =>
      this.toCode(c));
  } else if (val instanceof FHIR.CodeableConcept) {
    return this.codableConceptToCodes(val);
  } else if (val instanceof FHIR.Coding) {
    return this.codingToCode(val);
  }
};


FHIR.Base.prototype.codableConceptToCodes =function(cc) {
  return cc.coding().map((c) =>
    this.codingToCode(c));
};

FHIR.Base.prototype.codingToCode = coding => new DT.Code(coding.code(), coding.system(), coding.version());

FHIR.Base.prototype.periodToInterval =function(val) {
  if (val instanceof FHIR.Period) {
    const start =  val.getDate("start");
    const end =  val.getDate("end");
    return new DT.Interval(start, end);
  }
};


class PatientSource {
  constructor(patients) {
    this.patients = patients;
    this.nextPatient();
  }

  currentPatient() {
    return this.current_patient;
  }

  nextPatient() {
    this.current = this.patients.shift();
    this.current_bundle = this.current ? new FHIR.Bundle(this.current) : undefined;
    return this.current_patient = this.current_bundle != null ? this.current_bundle.findRecord("patient-qicore-qicore-patient") : undefined;
  }
}


module.exports.Patient = Patient;
module.exports.PatientSource = PatientSource;

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}