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
@class SubstanceInstanceComponent
@exports  SubstanceInstanceComponent as SubstanceInstanceComponent
*/
class SubstanceInstanceComponent extends BackboneElement {
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
  Identifier associated with the package/container (usually a label affixed directly).
  @returns {Identifier}
  */
  identifier() { if (this.json['identifier']) { return new Identifier(this.json['identifier']); } }
  
  /**
  When the substance is no longer valid to use. For some substances, a single arbitrary date is used for expiry.
  @returns {Array} an array of {@link Date} objects
  */
  expiry() { if (this.json['expiry']) { return DT.DateTime.parse(this.json['expiry']); } }
  
  /**
  The amount of the substance.
  @returns {Quantity}
  */
  quantity() { if (this.json['quantity']) { return new Quantity(this.json['quantity']); } }
}
  

/** 
Embedded class
@class SubstanceIngredientComponent
@exports  SubstanceIngredientComponent as SubstanceIngredientComponent
*/
class SubstanceIngredientComponent extends BackboneElement {
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
  The amount of the ingredient in the substance - a concentration ratio.
  @returns {Ratio}
  */
  quantity() { if (this.json['quantity']) { return new Ratio(this.json['quantity']); } }
  
  /**
  Another substance that is a component of this substance.
  @returns {Reference}
  */
  substance() { if (this.json['substance']) { return new Reference(this.json['substance']); } }
}
  
/**
A homogeneous material with a definite composition.
@class Substance
@exports Substance as Substance
*/
class Substance extends DomainResource {
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
  A code (or set of codes) that identify this substance.
  @returns {CodeableConcept}
  */
  type() { if (this.json['type']) { return new CodeableConcept(this.json['type']); } }
  
  /**
  A description of the substance - its appearance, handling requirements, and other usage notes.
  @returns {Array} an array of {@link String} objects
  */
  description() { return this.json['description']; }
  
  /**
  Substance may be used to describe a kind of substance, or a specific package/container of the substance: an instance.
  @returns {SubstanceInstanceComponent}
  */
  instance() { if (this.json['instance']) { return new SubstanceInstanceComponent(this.json['instance']); } }
  
  /**
  A substance can be composed of other substances.
  @returns {Array} an array of {@link SubstanceIngredientComponent} objects
  */
  ingredient() {
    if (this.json['ingredient']) {
      return this.json['ingredient'].map((item) =>
        new SubstanceIngredientComponent(item));
    }
  }
}
  



module.exports.Substance = Substance;
