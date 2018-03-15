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
@class OrderWhenComponent
@exports  OrderWhenComponent as OrderWhenComponent
*/
class OrderWhenComponent extends BackboneElement {
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
  Code specifies when request should be done. The code may simply be a priority code.
  @returns {CodeableConcept}
  */
  code() { if (this.json['code']) { return new CodeableConcept(this.json['code']); } }
  
  /**
  A formal schedule.
  @returns {Timing}
  */
  schedule() { if (this.json['schedule']) { return new Timing(this.json['schedule']); } }
}
  
/**
A request to perform an action.
@class Order
@exports Order as Order
*/
class Order extends DomainResource {
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
  Identifiers assigned to this order by the orderer or by the receiver.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier() {
    if (this.json['identifier']) {
      return this.json['identifier'].map((item) =>
        new Identifier(item));
    }
  }
  
  /**
  When the order was made.
  @returns {Array} an array of {@link Date} objects
  */
  date() { if (this.json['date']) { return DT.DateTime.parse(this.json['date']); } }
  
  /**
  Patient this order is about.
  @returns {Reference}
  */
  subject() { if (this.json['subject']) { return new Reference(this.json['subject']); } }
  
  /**
  Who initiated the order.
  @returns {Reference}
  */
  source() { if (this.json['source']) { return new Reference(this.json['source']); } }
  
  /**
  Who is intended to fulfill the order.
  @returns {Reference}
  */
  target() { if (this.json['target']) { return new Reference(this.json['target']); } }
  
  /**
  Text - why the order was made.
  @returns {CodeableConcept}
  */
  reasonCodeableConcept() { if (this.json['reasonCodeableConcept']) { return new CodeableConcept(this.json['reasonCodeableConcept']); } }
  /**
  Text - why the order was made.
  @returns {Reference}
  */
  reasonReference() { if (this.json['reasonReference']) { return new Reference(this.json['reasonReference']); } }
  
  /**
  If required by policy.
  @returns {Reference}
  */
  authority() { if (this.json['authority']) { return new Reference(this.json['authority']); } }
  
  /**
  When order should be fulfilled.
  @returns {OrderWhenComponent}
  */
  when() { if (this.json['when']) { return new OrderWhenComponent(this.json['when']); } }
  
  /**
  What action is being ordered.
  @returns {Array} an array of {@link Reference} objects
  */
  detail() {
    if (this.json['detail']) {
      return this.json['detail'].map((item) =>
        new Reference(item));
    }
  }
}
  



module.exports.Order = Order;
