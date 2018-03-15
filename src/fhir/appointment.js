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
@class AppointmentParticipantComponent
@exports  AppointmentParticipantComponent as AppointmentParticipantComponent
*/
class AppointmentParticipantComponent extends BackboneElement {
  constructor(json) {
    super(json);
    this.json = json;
  }
  /**
  Role of participant in the appointment.
  @returns {Array} an array of {@link CodeableConcept} objects
  */
  type() {
    if (this.json['type']) {
      return this.json['type'].map((item) =>
        new CodeableConcept(item));
    }
  }

  /**
  A Person of device that is participating in the appointment, usually Practitioner, Patient, RelatedPerson or Device.
  @returns {Reference}
  */
  actor() { if (this.json['actor']) { return new Reference(this.json['actor']); } }

  /**
  Is this participant required to be present at the meeting. This covers a use-case where 2 doctors need to meet to discuss the results for a specific patient, and the patient is not required to be present.
  @returns {Array} an array of {@link String} objects
  */
  required() { return this.json['required']; }

  /**
  Participation status of the Patient.
  @returns {Array} an array of {@link String} objects
  */
  status() { return this.json['status']; }
}

/**
A scheduled healthcare event for a patient and/or practitioner(s) where a service may take place at a specific date/time.
@class Appointment
@exports Appointment as Appointment
*/
class Appointment extends DomainResource {
  constructor(json) {
    super(json);
    this.json = json;
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
  The priority of the appointment. Can be used to make informed decisions if needing to re-prioritize appointments. (The iCal Standard specifies 0 as undefined, 1 as highest, 9 as lowest priority) (Need to change back to CodeableConcept).
  @returns {Array} an array of {@link Number} objects
  */
  priority() { return this.json['priority']; }

  /**
  Each of the participants has their own participation status which indicates their involvement in the process, however this status indicates the shared status.
  @returns {Array} an array of {@link String} objects
  */
  status() { return this.json['status']; }

  /**
  The type of appointments that is being booked (ideally this would be an identifiable service - which is at a location, rather than the location itself).
  @returns {CodeableConcept}
  */
  type() { if (this.json['type']) { return new CodeableConcept(this.json['type']); } }

  /**
  The reason that this appointment is being scheduled, this is more clinical than administrative.
  @returns {CodeableConcept}
  */
  reason() { if (this.json['reason']) { return new CodeableConcept(this.json['reason']); } }

  /**
  The brief description of the appointment as would be shown on a subject line in a meeting request, or appointment list. Detailed or expanded information should be put in the comment field.
  @returns {Array} an array of {@link String} objects
  */
  description() { return this.json['description']; }

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
  The slot that this appointment is filling. If provided then the schedule will not be provided as slots are not recursive, and the start/end values MUST be the same as from the slot.
  @returns {Array} an array of {@link Reference} objects
  */
  slot() {
    if (this.json['slot']) {
      return this.json['slot'].map((item) =>
        new Reference(item));
    }
  }

  /**
  The primary location that this appointment is to take place.
  @returns {Reference}
  */
  location() { if (this.json['location']) { return new Reference(this.json['location']); } }

  /**
  Additional comments about the appointment.
  @returns {Array} an array of {@link String} objects
  */
  comment() { return this.json['comment']; }

  /**
  An Order that lead to the creation of this appointment.
  @returns {Reference}
  */
  order() { if (this.json['order']) { return new Reference(this.json['order']); } }

  /**
  List of participants involved in the appointment.
  @returns {Array} an array of {@link AppointmentParticipantComponent} objects
  */
  participant() {
    if (this.json['participant']) {
      return this.json['participant'].map((item) =>
        new AppointmentParticipantComponent(item));
    }
  }

  /**
  Who recorded the appointment.
  @returns {Reference}
  */
  lastModifiedBy() { if (this.json['lastModifiedBy']) { return new Reference(this.json['lastModifiedBy']); } }

  /**
  Date when the appointment was recorded.
  @returns {Array} an array of {@link Date} objects
  */
  lastModified() { if (this.json['lastModified']) { return DT.DateTime.parse(this.json['lastModified']); } }
}




module.exports.Appointment = Appointment;
