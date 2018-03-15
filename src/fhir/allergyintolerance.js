/* eslint-disable
    constructor-super,
    no-constant-condition,
    no-this-before-super,
    no-undef,
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
@class AllergyIntoleranceEventComponent
@exports  AllergyIntoleranceEventComponent as AllergyIntoleranceEventComponent
*/
class AllergyIntoleranceEventComponent extends BackboneElement {
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
  Identification of the specific substance considered to be responsible for the Adverse Reaction event. Note: the substance for a specific reaction may be different to the substance identified as the cause of the risk, but must be consistent with it. For instance, it may be a more specific substance (e.g. a brand medication) or a composite substance that includes the identified substance. It must be clinically safe to only process the AllergyIntolerance.substance and ignore the AllergyIntolerance.event.substance.
  @returns {CodeableConcept}
  */
  substance() { if (this.json['substance']) { return new CodeableConcept(this.json['substance']); } }
  
  /**
  Statement about the degree of clinical certainty that the Specific Substance was the cause of the Manifestation in this reaction event.
  @returns {Array} an array of {@link String} objects
  */
  certainty() { return this.json['certainty']; }
  
  /**
  Clinical symptoms and/or signs that are observed or associated with the Adverse Reaction Event.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  manifestation() {
    if (this.json['manifestation']) {
      return this.json['manifestation'].map((item) =>
        new CodeableConcept(item));
    }
  }
  
  /**
  Text description about the Reaction as a whole, including details of the manifestation if required.
  @returns {Array} an array of {@link String} objects
  */
  description() { return this.json['description']; }
  
  /**
  Record of the date and/or time of the onset of the Reaction.
  @returns {Array} an array of {@link Date} objects
  */
  onset() { if (this.json['onset']) { return DT.DateTime.parse(this.json['onset']); } }
  
  /**
  The amount of time that the Adverse Reaction persisted.
  @returns {Duration}
  */
  duration() { if (this.json['duration']) { return new Duration(this.json['duration']); } }
  
  /**
  Clinical assessment of the severity of the reaction event as a whole, potentially considering multiple different manifestations.
  @returns {Array} an array of {@link String} objects
  */
  severity() { return this.json['severity']; }
  
  /**
  Identification of the route by which the subject was exposed to the substance.
  @returns {CodeableConcept}
  */
  exposureRoute() { if (this.json['exposureRoute']) { return new CodeableConcept(this.json['exposureRoute']); } }
  
  /**
  Additional text about the Adverse Reaction event not captured in other fields.
  @returns {Array} an array of {@link String} objects
  */
  comment() { return this.json['comment']; }
}
  
/**
Risk of harmful or undesirable, physiological response which is unique to an individual and associated with exposure to a substance.
@class AllergyIntolerance
@exports AllergyIntolerance as AllergyIntolerance
*/
class AllergyIntolerance extends DomainResource {
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
  This records identifiers associated with this allergy/intolerance concern that are defined by business processed and/ or used to refer to it when a direct URL reference to the resource itself is not appropriate (e.g. in CDA documents, or in written / printed documentation).
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier() {
    if (this.json['identifier']) {
      return this.json['identifier'].map((item) =>
        new Identifier(item));
    }
  }
  
  /**
  Date when the sensitivity was recorded.
  @returns {Array} an array of {@link Date} objects
  */
  recordedDate() { if (this.json['recordedDate']) { return DT.DateTime.parse(this.json['recordedDate']); } }
  
  /**
  Indicates who has responsibility for the record.
  @returns {Reference}
  */
  recorder() { if (this.json['recorder']) { return new Reference(this.json['recorder']); } }
  
  /**
  The patient who has the allergy or intolerance.
  @returns {Reference}
  */
  subject() { if (this.json['subject']) { return new Reference(this.json['subject']); } }
  
  /**
  Identification of a substance, or a class of substances, that is considered to be responsible for the Adverse reaction risk.
  @returns {CodeableConcept}
  */
  substance() { if (this.json['substance']) { return new CodeableConcept(this.json['substance']); } }
  
  /**
  Assertion about certainty associated with the propensity, or potential risk, of a reaction to the identified Substance.
  @returns {Array} an array of {@link String} objects
  */
  status() { return this.json['status']; }
  
  /**
  Estimate of the potential clinical harm, or seriousness, of the reaction to the identified Substance.
  @returns {Array} an array of {@link String} objects
  */
  criticality() { return this.json['criticality']; }
  
  /**
  Identification of the underlying physiological mechanism for the Reaction Risk.
  @returns {Array} an array of {@link String} objects
  */
  type() { return this.json['type']; }
  
  /**
  Category of the identified Substance.
  @returns {Array} an array of {@link String} objects
  */
  category() { return this.json['category']; }
  
  /**
  Represents the date and/or time of the last known occurence of a reaction event.
  @returns {Array} an array of {@link Date} objects
  */
  lastOccurence() { if (this.json['lastOccurence']) { return DT.DateTime.parse(this.json['lastOccurence']); } }
  
  /**
  Additional narrative about the propensity for the Adverse Reaction, not captured in other fields.
  @returns {Array} an array of {@link String} objects
  */
  comment() { return this.json['comment']; }
  
  /**
  Details about each Adverse Reaction Event linked to exposure to the identified Substance.
  @returns {Array} an array of {@link AllergyIntoleranceEventComponent} objects
  */
  event() {
    if (this.json['event']) {
      return this.json['event'].map((item) =>
        new AllergyIntoleranceEventComponent(item));
    }
  }
}
  



module.exports.AllergyIntolerance = AllergyIntolerance;
