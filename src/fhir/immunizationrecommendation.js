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
@class ImmunizationRecommendationRecommendationDateCriterionComponent
@exports  ImmunizationRecommendationRecommendationDateCriterionComponent as ImmunizationRecommendationRecommendationDateCriterionComponent
*/
class ImmunizationRecommendationRecommendationDateCriterionComponent extends BackboneElement {
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
  Date classification of recommendation - e.g. earliest date to give, latest date to give, etc.
  @returns {CodeableConcept}
  */
  code() { if (this.json['code']) { return new CodeableConcept(this.json['code']); } }
  
  /**
  Date recommendation.
  @returns {Array} an array of {@link Date} objects
  */
  value() { if (this.json['value']) { return DT.DateTime.parse(this.json['value']); } }
}
  

/** 
Embedded class
@class ImmunizationRecommendationRecommendationProtocolComponent
@exports  ImmunizationRecommendationRecommendationProtocolComponent as ImmunizationRecommendationRecommendationProtocolComponent
*/
class ImmunizationRecommendationRecommendationProtocolComponent extends BackboneElement {
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
  Indicates the nominal position in a series of the next dose.  This is the recommended dose number as per a specified protocol.
  @returns {Array} an array of {@link Number} objects
  */
  doseSequence() { return this.json['doseSequence']; }
  
  /**
  Contains the description about the protocol under which the vaccine was administered.
  @returns {Array} an array of {@link String} objects
  */
  description() { return this.json['description']; }
  
  /**
  Indicates the authority who published the protocol?  E.g. ACIP.
  @returns {Reference}
  */
  authority() { if (this.json['authority']) { return new Reference(this.json['authority']); } }
  
  /**
  One possible path to achieve presumed immunity against a disease - within the context of an authority.
  @returns {Array} an array of {@link String} objects
  */
  series() { return this.json['series']; }
}
  

/** 
Embedded class
@class ImmunizationRecommendationRecommendationComponent
@exports  ImmunizationRecommendationRecommendationComponent as ImmunizationRecommendationRecommendationComponent
*/
class ImmunizationRecommendationRecommendationComponent extends BackboneElement {
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
  The date the immunization recommendation was created.
  @returns {Array} an array of {@link Date} objects
  */
  date() { if (this.json['date']) { return DT.DateTime.parse(this.json['date']); } }
  
  /**
  Vaccine that pertains to the recommendation.
  @returns {CodeableConcept}
  */
  vaccineType() { if (this.json['vaccineType']) { return new CodeableConcept(this.json['vaccineType']); } }
  
  /**
  This indicates the next recommended dose number (e.g. dose 2 is the next recommended dose).
  @returns {Array} an array of {@link Number} objects
  */
  doseNumber() { return this.json['doseNumber']; }
  
  /**
  Vaccine administration status.
  @returns {CodeableConcept}
  */
  forecastStatus() { if (this.json['forecastStatus']) { return new CodeableConcept(this.json['forecastStatus']); } }
  
  /**
  Vaccine date recommendations - e.g. earliest date to administer, latest date to administer, etc.
  @returns {Array} an array of {@link ImmunizationRecommendationRecommendationDateCriterionComponent} objects
  */
  dateCriterion() {
    if (this.json['dateCriterion']) {
      return this.json['dateCriterion'].map((item) =>
        new ImmunizationRecommendationRecommendationDateCriterionComponent(item));
    }
  }
  
  /**
  Contains information about the protocol under which the vaccine was administered.
  @returns {ImmunizationRecommendationRecommendationProtocolComponent}
  */
  protocol() { if (this.json['protocol']) { return new ImmunizationRecommendationRecommendationProtocolComponent(this.json['protocol']); } }
  
  /**
  Immunization event history that supports the status and recommendation.
  @returns {Array} an array of {@link Reference} objects
  */
  supportingImmunization() {
    if (this.json['supportingImmunization']) {
      return this.json['supportingImmunization'].map((item) =>
        new Reference(item));
    }
  }
  
  /**
  Patient Information that supports the status and recommendation.  This includes patient observations, adverse reactions and allergy/intolerance information.
  @returns {Array} an array of {@link Reference} objects
  */
  supportingPatientInformation() {
    if (this.json['supportingPatientInformation']) {
      return this.json['supportingPatientInformation'].map((item) =>
        new Reference(item));
    }
  }
}
  
/**
A patient's point-of-time immunization status and recommendation with optional supporting justification.
@class ImmunizationRecommendation
@exports ImmunizationRecommendation as ImmunizationRecommendation
*/
class ImmunizationRecommendation extends DomainResource {
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
  A unique identifier assigned to this particular recommendation record.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier() {
    if (this.json['identifier']) {
      return this.json['identifier'].map((item) =>
        new Identifier(item));
    }
  }
  
  /**
  The patient who is the subject of the profile.
  @returns {Reference}
  */
  subject() { if (this.json['subject']) { return new Reference(this.json['subject']); } }
  
  /**
  Vaccine administration recommendations.
  @returns {Array} an array of {@link ImmunizationRecommendationRecommendationComponent} objects
  */
  recommendation() {
    if (this.json['recommendation']) {
      return this.json['recommendation'].map((item) =>
        new ImmunizationRecommendationRecommendationComponent(item));
    }
  }
}
  



module.exports.ImmunizationRecommendation = ImmunizationRecommendation;
