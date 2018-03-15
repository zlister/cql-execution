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
A record of a device being used by a patient where the record is the result of a report from the patient or another clinician.
@class DeviceUseStatement
@exports DeviceUseStatement as DeviceUseStatement
*/
class DeviceUseStatement extends DomainResource {
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
  Body site where the device was used.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  bodySite() {
    if (this.json['bodySite']) {
      return this.json['bodySite'].map((item) =>
        new CodeableConcept(item));
    }
  }
  
  /**
  The time period over which the device was used.
  @returns {Period}
  */
  whenUsed() { if (this.json['whenUsed']) { return new Period(this.json['whenUsed']); } }
  
  /**
  The details of the device used.
  @returns {Reference}
  */
  device() { if (this.json['device']) { return new Reference(this.json['device']); } }
  
  /**
  An external identifier for this statement such as an IRI.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier() {
    if (this.json['identifier']) {
      return this.json['identifier'].map((item) =>
        new Identifier(item));
    }
  }
  
  /**
  Reason or justification for the use of the device.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  indication() {
    if (this.json['indication']) {
      return this.json['indication'].map((item) =>
        new CodeableConcept(item));
    }
  }
  
  /**
  Details about the device statement that were not represented at all or sufficiently in one of the attributes provided in a class. These may include for example a comment, an instruction, or a note associated with the statement.
  @returns {Array} an array of {@link String} objects
  */
  notes() { return this.json['notes']; }
  
  /**
  The time at which the statement was made/recorded.
  @returns {Array} an array of {@link Date} objects
  */
  recordedOn() { if (this.json['recordedOn']) { return DT.DateTime.parse(this.json['recordedOn']); } }
  
  /**
  The patient who used the device.
  @returns {Reference}
  */
  subject() { if (this.json['subject']) { return new Reference(this.json['subject']); } }
  
  /**
  How often the device was used.
  @returns {Timing}
  */
  timingTiming() { if (this.json['timingTiming']) { return new Timing(this.json['timingTiming']); } }
  /**
  How often the device was used.
  @returns {Period}
  */
  timingPeriod() { if (this.json['timingPeriod']) { return new Period(this.json['timingPeriod']); } }
  /**
  How often the device was used.
  @returns {Array} an array of {@link Date} objects
  */
  timingDateTime() { if (this.json['timingDateTime']) { return DT.DateTime.parse(this.json['timingDateTime']); } }
}
  



module.exports.DeviceUseStatement = DeviceUseStatement;
