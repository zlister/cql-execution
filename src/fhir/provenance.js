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
@class ProvenanceAgentComponent
@exports  ProvenanceAgentComponent as ProvenanceAgentComponent
*/
class ProvenanceAgentComponent extends BackboneElement {
  constructor(json) {
    super(json);
    this.json = json;
  }
  /**
  The role that the participant played.
  @returns {Coding}
  */
  role() { if (this.json['role']) { return new Coding(this.json['role']); } }

  /**
  The type of the participant.
  @returns {Coding}
  */
  type() { if (this.json['type']) { return new Coding(this.json['type']); } }

  /**
  Identity of participant. May be a logical or physical uri and maybe absolute or relative.
  @returns {Array} an array of {@link String} objects
  */
  reference() { return this.json['reference']; }

  /**
  Human-readable description of the participant.
  @returns {Array} an array of {@link String} objects
  */
  display() { return this.json['display']; }
}


/**
Embedded class
@class ProvenanceEntityComponent
@exports  ProvenanceEntityComponent as ProvenanceEntityComponent
*/
class ProvenanceEntityComponent extends BackboneElement {
  constructor(json) {
    super(json);
    this.json = json;
  }
  /**
  How the entity was used during the activity.
  @returns {Array} an array of {@link String} objects
  */
  role() { return this.json['role']; }

  /**
  The type of the entity. If the entity is a resource, then this is a resource type.
  @returns {Coding}
  */
  type() { if (this.json['type']) { return new Coding(this.json['type']); } }

  /**
  Identity of participant. May be a logical or physical uri and maybe absolute or relative.
  @returns {Array} an array of {@link String} objects
  */
  reference() { return this.json['reference']; }

  /**
  Human-readable description of the entity.
  @returns {Array} an array of {@link String} objects
  */
  display() { return this.json['display']; }

  /**
  The entity is attributed to an agent to express the agent's responsibility for that entity, possibly along with other agents. This description can be understood as shorthand for saying that the agent was responsible for the activity which generated the entity.
  @returns {ProvenanceAgentComponent}
  */
  agent() { if (this.json['agent']) { return new ProvenanceAgentComponent(this.json['agent']); } }
}

/**
Provenance information that describes the activity that led to the creation of a set of resources. This information can be used to help determine their reliability or trace where the information in them came from. The focus of the provenance resource is record keeping, audit and traceability, and not explicit statements of clinical significance.
@class Provenance
@exports Provenance as Provenance
*/
class Provenance extends DomainResource {
  constructor(json) {
    super(json);
    this.json = json;
  }
  /**
  The Reference(s) that were generated by  the activity described in this resource. A provenance can point to more than one target if multiple resources were created/updated by the same activity.
  @returns {Array} an array of {@link Reference} objects
  */
  target() {
    if (this.json['target']) {
      return this.json['target'].map((item) =>
        new Reference(item));
    }
  }

  /**
  The period during which the activity occurred.
  @returns {Period}
  */
  period() { if (this.json['period']) { return new Period(this.json['period']); } }

  /**
  The instant of time at which the activity was recorded.
  @returns {Array} an array of {@link Date} objects
  */
  recorded() { if (this.json['recorded']) { return DT.DateTime.parse(this.json['recorded']); } }

  /**
  The reason that the activity was taking place.
  @returns {CodeableConcept}
  */
  reason() { if (this.json['reason']) { return new CodeableConcept(this.json['reason']); } }

  /**
  Where the activity occurred, if relevant.
  @returns {Reference}
  */
  location() { if (this.json['location']) { return new Reference(this.json['location']); } }

  /**
  Policy or plan the activity was defined by. Typically, a single activity may have multiple applicable policy documents, such as patient consent, guarantor funding, etc.
  @returns {Array} an array of {@link String} objects
  */
  policy() { return this.json['policy']; }

  /**
  An agent takes a role in an activity such that the agent can be assigned some degree of responsibility for the activity taking place. An agent can be a person, a piece of software, an inanimate object, an organization, or other entities that may be ascribed responsibility.
  @returns {Array} an array of {@link ProvenanceAgentComponent} objects
  */
  agent() {
    if (this.json['agent']) {
      return this.json['agent'].map((item) =>
        new ProvenanceAgentComponent(item));
    }
  }

  /**
  An entity used in this activity.
  @returns {Array} an array of {@link ProvenanceEntityComponent} objects
  */
  entity() {
    if (this.json['entity']) {
      return this.json['entity'].map((item) =>
        new ProvenanceEntityComponent(item));
    }
  }

  /**
  A digital signature on the target Reference(s). The signature should match a Provenance.agent.reference in the provenance resource. The signature is only added to support checking cryptographic integrity of the resource, and not to represent workflow and clinical aspects of the signing process, or to support non-repudiation.
  @returns {Array} an array of {@link String} objects
  */
  integritySignature() { return this.json['integritySignature']; }
}




module.exports.Provenance = Provenance;
