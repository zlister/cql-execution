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
@class SubscriptionChannelComponent
@exports  SubscriptionChannelComponent as SubscriptionChannelComponent
*/
class SubscriptionChannelComponent extends BackboneElement {
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
  Todo.
  @returns {Array} an array of {@link String} objects
  */
  type() { return this.json['type']; }
  
  /**
  Todo.
  @returns {Array} an array of {@link String} objects
  */
  url() { return this.json['url']; }
  
  /**
  ToDo.
  @returns {Array} an array of {@link String} objects
  */
  payload() { return this.json['payload']; }
  
  /**
  Usage depends on the channel type.
  @returns {Array} an array of {@link String} objects
  */
  header() { return this.json['header']; }
}
  

/** 
Embedded class
@class SubscriptionTagComponent
@exports  SubscriptionTagComponent as SubscriptionTagComponent
*/
class SubscriptionTagComponent extends BackboneElement {
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
  Todo.
  @returns {Array} an array of {@link String} objects
  */
  term() { return this.json['term']; }
  
  /**
  Todo.
  @returns {Array} an array of {@link String} objects
  */
  scheme() { return this.json['scheme']; }
  
  /**
  Todo.
  @returns {Array} an array of {@link String} objects
  */
  description() { return this.json['description']; }
}
  
/**
Todo.
@class Subscription
@exports Subscription as Subscription
*/
class Subscription extends DomainResource {
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
  Todo.
  @returns {Array} an array of {@link String} objects
  */
  criteria() { return this.json['criteria']; }
  
  /**
  Todo.
  @returns {Array} an array of {@link ContactPoint} objects
  */
  contact() {
    if (this.json['contact']) {
      return this.json['contact'].map((item) =>
        new ContactPoint(item));
    }
  }
  
  /**
  Todo.
  @returns {Array} an array of {@link String} objects
  */
  reason() { return this.json['reason']; }
  
  /**
  Todo.
  @returns {Array} an array of {@link String} objects
  */
  status() { return this.json['status']; }
  
  /**
  Todo.
  @returns {Array} an array of {@link String} objects
  */
  error() { return this.json['error']; }
  
  /**
  Todo.
  @returns {SubscriptionChannelComponent}
  */
  channel() { if (this.json['channel']) { return new SubscriptionChannelComponent(this.json['channel']); } }
  
  /**
  Todo.
  @returns {Array} an array of {@link Date} objects
  */
  end() { if (this.json['end']) { return DT.DateTime.parse(this.json['end']); } }
  
  /**
  Todo.
  @returns {Array} an array of {@link SubscriptionTagComponent} objects
  */
  tag() {
    if (this.json['tag']) {
      return this.json['tag'].map((item) =>
        new SubscriptionTagComponent(item));
    }
  }
}
  



module.exports.Subscription = Subscription;
