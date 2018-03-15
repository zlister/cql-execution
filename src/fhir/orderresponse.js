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
A response to an order.
@class OrderResponse
@exports OrderResponse as OrderResponse
*/
class OrderResponse extends DomainResource {
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
  Identifiers assigned to this order. The identifiers are usually assigned by the system responding to the order, but they may be provided or added to by other systems.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier() {
    if (this.json['identifier']) {
      return this.json['identifier'].map((item) =>
        new Identifier(item));
    }
  }
  
  /**
  A reference to the order that this is in response to.
  @returns {Reference}
  */
  request() { if (this.json['request']) { return new Reference(this.json['request']); } }
  
  /**
  The date and time at which this order response was made (created/posted).
  @returns {Array} an array of {@link Date} objects
  */
  date() { if (this.json['date']) { return DT.DateTime.parse(this.json['date']); } }
  
  /**
  The person, organization, or device credited with making the response.
  @returns {Reference}
  */
  who() { if (this.json['who']) { return new Reference(this.json['who']); } }
  
  /**
  A reference to an authority policy that is the reason for the response. Usually this is used when the order is rejected, to provide a reason for rejection.
  @returns {CodeableConcept}
  */
  authorityCodeableConcept() { if (this.json['authorityCodeableConcept']) { return new CodeableConcept(this.json['authorityCodeableConcept']); } }
  /**
  A reference to an authority policy that is the reason for the response. Usually this is used when the order is rejected, to provide a reason for rejection.
  @returns {Reference}
  */
  authorityReference() { if (this.json['authorityReference']) { return new Reference(this.json['authorityReference']); } }
  
  /**
  What this response says about the status of the original order.
  @returns {Array} an array of {@link String} objects
  */
  code() { return this.json['code']; }
  
  /**
  Additional description about the response - e.g. a text description provided by a human user when making decisions about the order.
  @returns {Array} an array of {@link String} objects
  */
  description() { return this.json['description']; }
  
  /**
  Links to resources that provide details of the outcome of performing the order. E.g. Diagnostic Reports in a response that is made to an order that referenced a diagnostic order.
  @returns {Array} an array of {@link Reference} objects
  */
  fulfillment() {
    if (this.json['fulfillment']) {
      return this.json['fulfillment'].map((item) =>
        new Reference(item));
    }
  }
}
  



module.exports.OrderResponse = OrderResponse;
