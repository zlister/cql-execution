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
A photo, video, or audio recording acquired or used in healthcare. The actual content may be inline or provided by direct reference.
@class Media
@exports Media as Media
*/
class Media extends DomainResource {
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
  Whether the media is a photo (still image), an audio recording, or a video recording.
  @returns {Array} an array of {@link String} objects
  */
  type() { return this.json['type']; }
  
  /**
  Details of the type of the media - usually, how it was acquired (what type of device). If images sourced from a DICOM system, are wrapped in a Media resource, then this is the modality.
  @returns {CodeableConcept}
  */
  subtype() { if (this.json['subtype']) { return new CodeableConcept(this.json['subtype']); } }
  
  /**
  Identifiers associated with the image - these may include identifiers for the image itself, identifiers for the context of its collection (e.g. series ids) and context ids such as accession numbers or other workflow identifiers.
  @returns {Array} an array of {@link Identifier} objects
  */
  identifier() {
    if (this.json['identifier']) {
      return this.json['identifier'].map((item) =>
        new Identifier(item));
    }
  }
  
  /**
  The date/time when the media was originally recorded. For video and audio, if the length of the recording is not insignificant, this is the start of the recording.
  @returns {Array} an array of {@link Date} objects
  */
  created() { if (this.json['created']) { return DT.DateTime.parse(this.json['created']); } }
  
  /**
  Who/What this Media is a record of.
  @returns {Reference}
  */
  subject() { if (this.json['subject']) { return new Reference(this.json['subject']); } }
  
  /**
  The person who administered the collection of the image.
  @returns {Reference}
  */
  operator() { if (this.json['operator']) { return new Reference(this.json['operator']); } }
  
  /**
  The name of the imaging view e.g Lateral or Antero-posterior (AP).
  @returns {CodeableConcept}
  */
  view() { if (this.json['view']) { return new CodeableConcept(this.json['view']); } }
  
  /**
  The name of the device / manufacturer of the device  that was used to make the recording.
  @returns {Array} an array of {@link String} objects
  */
  deviceName() { return this.json['deviceName']; }
  
  /**
  Height of the image in pixels(photo/video).
  @returns {Array} an array of {@link Number} objects
  */
  height() { return this.json['height']; }
  
  /**
  Width of the image in pixels (photo/video).
  @returns {Array} an array of {@link Number} objects
  */
  width() { return this.json['width']; }
  
  /**
  The number of frames in a photo. This is used with a multi-page fax, or an imaging acquisition context that takes multiple slices in a single image, or an animated gif. If there is more than one frame, this SHALL have a value in order to alert interface software that a multi-frame capable rendering widget is required.
  @returns {Array} an array of {@link Number} objects
  */
  frames() { return this.json['frames']; }
  
  /**
  The duration of the recording in seconds - for audio and video.
  @returns {Array} an array of {@link Number} objects
  */
  duration() { return this.json['duration']; }
  
  /**
  The actual content of the media - inline or by direct reference to the media source file.
  @returns {Attachment}
  */
  content() { if (this.json['content']) { return new Attachment(this.json['content']); } }
}
  



module.exports.Media = Media;
