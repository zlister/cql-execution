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
A Search Parameter that defines a named search item that can be used to search/filter on a resource.
@class SearchParameter
@exports SearchParameter as SearchParameter
*/
class SearchParameter extends DomainResource {
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
  The URL at which this search parameter is (or will be) published, and which is used to reference this profile in conformance statements.
  @returns {Array} an array of {@link String} objects
  */
  url() { return this.json['url']; }
  
  /**
  The name of the standard or custom search parameter.
  @returns {Array} an array of {@link String} objects
  */
  name() { return this.json['name']; }
  
  /**
  Details of the individual or organization who accepts responsibility for publishing the search parameter.
  @returns {Array} an array of {@link String} objects
  */
  publisher() { return this.json['publisher']; }
  
  /**
  Contact details to assist a user in finding and communicating with the publisher.
  @returns {Array} an array of {@link ContactPoint} objects
  */
  telecom() {
    if (this.json['telecom']) {
      return this.json['telecom'].map((item) =>
        new ContactPoint(item));
    }
  }
  
  /**
  The Scope and Usage that this search parameter was created to meet.
  @returns {Array} an array of {@link String} objects
  */
  requirements() { return this.json['requirements']; }
  
  /**
  The base resource type that this search parameter refers to.
  @returns {Array} an array of {@link String} objects
  */
  base() { return this.json['base']; }
  
  /**
  The type of value a search parameter refers to, and how the content is interpreted.
  @returns {Array} an array of {@link String} objects
  */
  type() { return this.json['type']; }
  
  /**
  A description of the search parameters and how it used.
  @returns {Array} an array of {@link String} objects
  */
  description() { return this.json['description']; }
  
  /**
  An XPath expression that returns a set of elements for the search parameter.
  @returns {Array} an array of {@link String} objects
  */
  xpath() { return this.json['xpath']; }
  
  /**
  Types of resource (if a resource is referenced).
  @returns {Array} an array of {@link String} objects
  */
  target() { return this.json['target']; }
}
  



module.exports.SearchParameter = SearchParameter;
