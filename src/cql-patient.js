const DT = require('./datatypes/datatypes');
const FHIR = require('./fhir/models');
const { typeIsArray } = require('./util/util');

class Record {
  constructor(json) {
    this.json = json;
  }

  get(field) {
    return this.json[field];
  }

  getDate(field) {
    const val = this.get(field);
    if (val != null) {
      return DT.DateTime.parse(val);
    }
  }

  getInterval(field) {
    const val = this.get(field);
    if (val != null && typeof val === 'object') {
      const start = (val.start != null) ? DT.DateTime.parse(val.start) : null;
      const end = (val.end != null) ? DT.DateTime.parse(val.end) : null;
      return new DT.Interval(start, end);
    }
  }

  getDateOrInterval(field) {
    const val = this.get(field);
    if (val != null && (typeof val === 'object')) {
      return this.getInterval(field);
    }
    return this.getDate(field);
  }

  getCode(field) {
    const val = this.get(field);
    if (val != null && (typeof val === 'object')) {
      return new DT.Code(val.code, val.system, val.version);
    }
  }
}

class Patient {
  constructor(json) {
    this.identifier = json.identifier;
    this.name = json.name;
    this.gender = json.gender;
    this.birthDate = (json.birthDate != null) ? DT.DateTime.parse(json.birthDate) : undefined;
    this.records = {};
    if (json.records) {
      for (let r of json.records) {
        if (this.records[r.profile] == null) {
          this.records[r.profile] = [];
        }
        this.records[r.profile].push(new Record(r));
      }
    }
  }

  findRecords(profile) {
    if (profile === 'patient-qicore-qicore-patient') {
      return [this];
    }
    return this.records[profile] != null ? this.records[profile] : [];
  }
}



FHIR.Patient.prototype.records = function() {
  this._records = {};
  if (this.json.records) {
    for (let r of this.json.records) {
      if (this._records[r.profile] == null) {
        this._records[r.profile] = [];
      }
      this._records[r.profile].push(new Record(r));
    }
  }
  return this._records;
};

FHIR.Patient.prototype.findRecords = function(profile) {
  if (profile === 'patient-qicore-qicore-patient') {
    return [this];
  } else if (this._bundle != null) {
    return this._bundle.findRecords(profile);
  }
  return [];
};

FHIR.Bundle.prototype.findRecords = function(profile) {
  const filtered = this.entry().filter(e => {
    return e.resource() && e.resource().meta() && e.resource().meta().profile()
      && e.resource().meta().profile().indexOf(profile) > -1;
  });
  return filtered.map(e => {
    const r = e.resource();
    r._bundle = this;
    return r;
  });
};

FHIR.Bundle.prototype.findRecord = function(profile) {
  return this.findRecords(profile)[0];
};

FHIR.Base.prototype.get = function(field) {
  if (this[field] != null) {
    return this[field].call(this);
  }
};

FHIR.Base.prototype.getDate = function(field) {
  const val = this.get(field);
  if (val instanceof DT.DateTime) {
    return val;
  } else if (typeof val === 'string') {
    return DT.DateTime.parse(val);
  }
};

FHIR.Base.prototype.getInterval= function(field) {
  const val = this.get(field);
  if (val instanceof FHIR.Period) {
    return this.periodToInterval(val);
  }
};

FHIR.Base.prototype.getDateOrInterval = function(field) {
  const val = this.get(field);
  if (val instanceof FHIR.Period) {
    return this.periodToInterval(val);
  } else if (typeof val === 'string') {
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
    return val.map(c => this.toCode(c));
  } else if (val instanceof FHIR.CodeableConcept) {
    return this.codableConceptToCodes(val);
  } else if (val instanceof FHIR.Coding) {
    return this.codingToCode(val);
  }
};


FHIR.Base.prototype.codableConceptToCodes = function(cc) {
  return cc.coding().map(c => this.codingToCode(c));
};

FHIR.Base.prototype.codingToCode = function(coding) {
  return new DT.Code(coding.code(), coding.system(), coding.version());
};

FHIR.Base.prototype.periodToInterval =function(val) {
  if (val instanceof FHIR.Period) {
    const start =  val.getDate('start');
    const end =  val.getDate('end');
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
    this.current_patient = this.current_bundle != null ? this.current_bundle.findRecord('patient-qicore-qicore-patient') : undefined;
    return this.current_patient;
  }
}


module.exports = { Patient, PatientSource };