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
A reply to an appointment request for a patient and/or practitioner(s), such as a confirmation or rejection.
@class AppointmentResponse
@exports AppointmentResponse as AppointmentResponse
*/
class AppointmentResponse extends DomainResource {
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
  This records identifiers associated with this appointment concern that are defined by business processed and/ or used to refer to it when a direct URL reference to the resource itself is not appropriate (e.g. in CDA documents, or in written / printed documentation).
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier() {
    if (this.json['identifier']) {
      return this.json['identifier'].map((item) =>
        new Identifier(item));
    }
  }
  
  /**
  Parent appointment that this response is replying to.
  @returns {Reference}
  */
  appointment() { if (this.json['appointment']) { return new Reference(this.json['appointment']); } }
  
  /**
  Role of participant in the appointment.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  participantType() {
    if (this.json['participantType']) {
      return this.json['participantType'].map((item) =>
        new CodeableConcept(item));
    }
  }
  
  /**
  A Person of device that is participating in the appointment, usually Practitioner, Patient, RelatedPerson or Device.
  @returns {Array} an array of {@link Reference} objects
  */
  individual() {
    if (this.json['individual']) {
      return this.json['individual'].map((item) =>
        new Reference(item));
    }
  }
  
  /**
  Participation status of the Patient.
  @returns {Array} an array of {@link String} objects
  */
  participantStatus() { return this.json['participantStatus']; }
  
  /**
  Additional comments about the appointment.
  @returns {Array} an array of {@link String} objects
  */
  comment() { return this.json['comment']; }
  
  /**
  Date/Time that the appointment is to take place.
  @returns {Array} an array of {@link Date} objects
  */
  start() { if (this.json['start']) { return DT.DateTime.parse(this.json['start']); } }
  
  /**
  Date/Time that the appointment is to conclude.
  @returns {Array} an array of {@link Date} objects
  */
  end() { if (this.json['end']) { return DT.DateTime.parse(this.json['end']); } }
  
  /**
  Who recorded the appointment response.
  @returns {Reference}
  */
  lastModifiedBy() { if (this.json['lastModifiedBy']) { return new Reference(this.json['lastModifiedBy']); } }
  
  /**
  Date when the response was recorded or last updated.
  @returns {Array} an array of {@link Date} objects
  */
  lastModified() { if (this.json['lastModified']) { return DT.DateTime.parse(this.json['lastModified']); } }
}
  



module.exports.AppointmentResponse = AppointmentResponse;
