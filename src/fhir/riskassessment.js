/* eslint-disable
    constructor-super,
    no-constant-condition,
    no-this-before-super,
    no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */

// Copyright (c) 2014 The MITRE Corporation
// All rights reserved.
// 
// Redistribution and use in source and binary forms, with or without modification, 
// are permitted provided that the following conditions are met:
// 
//     * Redistributions of source code must retain the above copyright notice, this 
//       list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright notice, 
//       this list of conditions and the following disclaimer in the documentation 
//       and/or other materials provided with the distribution.
//     * Neither the name of HL7 nor the names of its contributors may be used to 
//       endorse or promote products derived from this software without specific 
//       prior written permission.
// 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND 
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED 
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
// IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT 
// NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR 
// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, 
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
// POSSIBILITY OF SUCH DAMAGE.
const DT = require('../cql-datatypes');
const CORE = require('./core');
let { Element } = CORE;
let { Resource } = CORE;
const { Timing } = CORE;
const { Period } = CORE;
const { Parameters } = CORE;
const { Coding } = CORE;
({ Resource } = CORE);
const { Range } = CORE;
const { Quantity } = CORE;
const { Attachment } = CORE;
const { BackboneElement } = CORE;
const { DomainResource } = CORE;
const { ContactPoint } = CORE;
const { ElementDefinition } = CORE;
const { Extension } = CORE;
const { HumanName } = CORE;
const { Address } = CORE;
const { Ratio } = CORE;
const { SampledData } = CORE;
const { Reference } = CORE;
const { CodeableConcept } = CORE;
const { Identifier } = CORE;
const { Narrative } = CORE;
({ Element } = CORE);

/** 
Embedded class
@class RiskAssessmentPredictionComponent
@exports  RiskAssessmentPredictionComponent as RiskAssessmentPredictionComponent
*/
class RiskAssessmentPredictionComponent extends BackboneElement {
  constructor(json) {
    {
      // Hack: trick Babel/TypeScript into allowing this before super.
      if (false) { super(); }
      let thisFn = (() => { this; }).toString();
      let thisName = thisFn.slice(thisFn.indexOf('{') + 1, thisFn.indexOf(';')).trim();
      eval(`${thisName} = this;`);
    }
    this.json = json;
    super(this.json);
  }
  /**
  One of the potential outcomes for the patient (e.g. remission, death,  a particular condition).
  @returns {CodeableConcept}
  */
  outcome() { if (this.json['outcome']) { return new CodeableConcept(this.json['outcome']); } }
  
  /**
  How likely is the outcome (in the specified timeframe).
  @returns {Array} an array of {@link Number} objects
  */
  probabilityDecimal() { return this.json['probabilityDecimal']; }
  /**
  How likely is the outcome (in the specified timeframe).
  @returns {Range}
  */
  probabilityRange() { if (this.json['probabilityRange']) { return new Range(this.json['probabilityRange']); } }
  /**
  How likely is the outcome (in the specified timeframe).
  @returns {CodeableConcept}
  */
  probabilityCodeableConcept() { if (this.json['probabilityCodeableConcept']) { return new CodeableConcept(this.json['probabilityCodeableConcept']); } }
  
  /**
  Indicates the risk for this particular subject (with their specific characteristics) divided by the risk of the population in general.  (Numbers greater than 1 = higher risk than the population, numbers less than 1 = lower risk.).
  @returns {Array} an array of {@link Number} objects
  */
  relativeRisk() { return this.json['relativeRisk']; }
  
  /**
  Indicates the period of time or age range of the subject to which the specified probability applies.
  @returns {Period}
  */
  whenPeriod() { if (this.json['whenPeriod']) { return new Period(this.json['whenPeriod']); } }
  /**
  Indicates the period of time or age range of the subject to which the specified probability applies.
  @returns {Range}
  */
  whenRange() { if (this.json['whenRange']) { return new Range(this.json['whenRange']); } }
  
  /**
  Additional information explaining the basis for the prediction.
  @returns {Array} an array of {@link String} objects
  */
  rationale() { return this.json['rationale']; }
}
  
/**
An assessment of the likely outcome(s) for a patient or other subject as well as the likelihood of each outcome.
@class RiskAssessment
@exports RiskAssessment as RiskAssessment
*/
class RiskAssessment extends DomainResource {
  constructor(json) {
    {
      // Hack: trick Babel/TypeScript into allowing this before super.
      if (false) { super(); }
      let thisFn = (() => { this; }).toString();
      let thisName = thisFn.slice(thisFn.indexOf('{') + 1, thisFn.indexOf(';')).trim();
      eval(`${thisName} = this;`);
    }
    this.json = json;
    super(this.json);
  }
  /**
  The patient or group the risk assessment applies to.
  @returns {Reference}
  */
  subject() { if (this.json['subject']) { return new Reference(this.json['subject']); } }
  
  /**
  The date (and possibly time) the risk assessment was performed.
  @returns {Array} an array of {@link Date} objects
  */
  date() { if (this.json['date']) { return DT.DateTime.parse(this.json['date']); } }
  
  /**
  For assessments or prognosis specific to a particular condition, indicates the condition being assessed.
  @returns {Reference}
  */
  condition() { if (this.json['condition']) { return new Reference(this.json['condition']); } }
  
  /**
  The provider or software application that performed the assessment.
  @returns {Reference}
  */
  performer() { if (this.json['performer']) { return new Reference(this.json['performer']); } }
  
  /**
  Business identifier assigned to the risk assessment.
  @returns {Identifier}
  */
  identifier() { if (this.json['identifier']) { return new Identifier(this.json['identifier']); } }
  
  /**
  The algorithm, processs or mechanism used to evaluate the risk.
  @returns {CodeableConcept}
  */
  method() { if (this.json['method']) { return new CodeableConcept(this.json['method']); } }
  
  /**
  Indicates the source data considered as part of the assessment (FamilyHistory, Observations, Procedures, Conditions, etc.).
  @returns {Array} an array of {@link Reference} objects
  */
  basis() {
    if (this.json['basis']) {
      return this.json['basis'].map((item) =>
        new Reference(item));
    }
  }
  
  /**
  Describes the expected outcome for the subject.
  @returns {Array} an array of {@link RiskAssessmentPredictionComponent} objects
  */
  prediction() {
    if (this.json['prediction']) {
      return this.json['prediction'].map((item) =>
        new RiskAssessmentPredictionComponent(item));
    }
  }
  
  /**
  A description of the steps that might be taken to reduce the identified risk(s).
  @returns {Array} an array of {@link String} objects
  */
  mitigation() { return this.json['mitigation']; }
}
  



module.exports.RiskAssessment = RiskAssessment;
