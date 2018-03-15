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
@class LocationPositionComponent
@exports  LocationPositionComponent as LocationPositionComponent
*/
class LocationPositionComponent extends BackboneElement {
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
  Longitude. The value domain and the interpretation are the same as for the text of the longitude element in KML (see notes below).
  @returns {Array} an array of {@link Number} objects
  */
  longitude() { return this.json['longitude']; }
  
  /**
  Latitude. The value domain and the interpretation are the same as for the text of the latitude element in KML (see notes below).
  @returns {Array} an array of {@link Number} objects
  */
  latitude() { return this.json['latitude']; }
  
  /**
  Altitude. The value domain and the interpretation are the same as for the text of the altitude element in KML (see notes below).
  @returns {Array} an array of {@link Number} objects
  */
  altitude() { return this.json['altitude']; }
}
  
/**
Details and position information for a physical place where services are provided  and resources and participants may be stored, found, contained or accommodated.
@class Location
@exports Location as Location
*/
class Location extends DomainResource {
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
  Unique code or number identifying the location to its users.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier() {
    if (this.json['identifier']) {
      return this.json['identifier'].map((item) =>
        new Identifier(item));
    }
  }
  
  /**
  Name of the location as used by humans. Does not need to be unique.
  @returns {Array} an array of {@link String} objects
  */
  name() { return this.json['name']; }
  
  /**
  Description of the Location, which helps in finding or referencing the place.
  @returns {Array} an array of {@link String} objects
  */
  description() { return this.json['description']; }
  
  /**
  Indicates the type of function performed at the location.
  @returns {CodeableConcept}
  */
  type() { if (this.json['type']) { return new CodeableConcept(this.json['type']); } }
  
  /**
  The contact details of communication devices available at the location. This can include phone numbers, fax numbers, mobile numbers, email addresses and web sites.
  @returns {Array} an array of {@link ContactPoint} objects
  */
  telecom() {
    if (this.json['telecom']) {
      return this.json['telecom'].map((item) =>
        new ContactPoint(item));
    }
  }
  
  /**
  Physical location.
  @returns {Address}
  */
  address() { if (this.json['address']) { return new Address(this.json['address']); } }
  
  /**
  Physical form of the location, e.g. building, room, vehicle, road.
  @returns {CodeableConcept}
  */
  physicalType() { if (this.json['physicalType']) { return new CodeableConcept(this.json['physicalType']); } }
  
  /**
  The absolute geographic location of the Location, expressed in a KML compatible manner (see notes below for KML).
  @returns {LocationPositionComponent}
  */
  position() { if (this.json['position']) { return new LocationPositionComponent(this.json['position']); } }
  
  /**
  The organization that is responsible for the provisioning and upkeep of the location.
  @returns {Reference}
  */
  managingOrganization() { if (this.json['managingOrganization']) { return new Reference(this.json['managingOrganization']); } }
  
  /**
  active | suspended | inactive.
  @returns {Array} an array of {@link String} objects
  */
  status() { return this.json['status']; }
  
  /**
  Another Location which this Location is physically part of.
  @returns {Reference}
  */
  partOf() { if (this.json['partOf']) { return new Reference(this.json['partOf']); } }
  
  /**
  Indicates whether a resource instance represents a specific location or a class of locations.
  @returns {Array} an array of {@link String} objects
  */
  mode() { return this.json['mode']; }
}
  



module.exports.Location = Location;
