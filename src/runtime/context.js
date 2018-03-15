/* eslint-disable
    constructor-super,
    no-constant-condition,
    no-this-before-super,
    no-undef,
    no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let Context, PatientContext, PopulationContext;
const { Library } = require('../elm/library');
const { Exception } = require('../datatypes/exception');
const { typeIsArray } = require('../util/util');
const util = require('util');
Function.prototype.property = function(prop, desc) {
  return Object.defineProperty(this.prototype, prop, desc);
};

module.exports.Context = (Context = (function() {
  Context = class Context {
    static initClass() {

      this.property('parameters' , {
        get() {
          return this._parameters || (this.parent != null ? this.parent.parameters : undefined);
        },

        set(params) {
          this.checkParameters(params);
          return this._parameters = params;
        }
      }
      );

      this.property('codeService' , {
        get() { return this._codeService || (this.parent != null ? this.parent.codeService : undefined); },
        set(cs) { return this._codeService = cs; }
      }
      );
    }

    constructor(parent, _codeService = null, _parameters = {}) {
      this.parent = parent;
      this._codeService = _codeService;
      this.context_values = {};
      this.library_context = {};
      this.localId_context = {};
      // TODO: If there is an issue with number of parameters look into cql4browsers fix: 387ea77538182833283af65e6341e7a05192304c
      this.checkParameters(_parameters); // not crazy about possibly throwing an error in a constructor, but...
      this._parameters = _parameters;
    }


    withParameters(params) {
      this.parameters = params != null ? params : {};
      return this;
    }

    withCodeService(cs) {
      this.codeService = cs;
      return this;
    }

    rootContext() {
      if ( this.parent ) { return this.parent.rootContext(); } else { return this; }
    }

    findRecords( profile) {
      return (this.parent != null ? this.parent.findRecords(profile) : undefined);
    }

    childContext(context_values = {}) {
      const ctx = new Context(this);
      ctx.context_values = context_values;
      return ctx;
    }

    getLibraryContext(library) {
      return (this.parent != null ? this.parent.getLibraryContext(library) : undefined);
    }

    getLocalIdContext(localId) {
      return (this.parent != null ? this.parent.getLocalIdContext(localId) : undefined);
    }

    getParameter(name) {
      return (this.parent != null ? this.parent.getParameter(name) : undefined);
    }

    getParentParameter(name) {
      if ((this.parent != null ? this.parent.parameters[name] : undefined) != null) {
        return this.parent.parameters[name];
      } else if (this.parent != null) {
        return this.parent.getParentParameter(name);
      }
    }

    getValueSet(name) {
      return (this.parent != null ? this.parent.getValueSet(name) : undefined);
    }

    getCodeSystem(name) {
      return (this.parent != null ? this.parent.getCodeSystem(name) : undefined);
    }

    getCode(name) {
      return (this.parent != null ? this.parent.getCode(name) : undefined);
    }

    getConcept(name) {
      return (this.parent != null ? this.parent.getConcept(name) : undefined);
    }

    get(identifier) {
      // Check for undefined because if its null, we actually *do* want to return null (rather than looking at parent),
      // but if it's really undefined, *then* look at the parent
      if (typeof this.context_values[identifier] !== 'undefined') {
        return this.context_values[identifier];
      } else {
        return (this.parent != null ? this.parent.get(identifier) : undefined);
      }
    }

    set(identifier, value) {
      return this.context_values[identifier] = value;
    }

    setLocalIdWithResult(localId, value) {
      // Temporary fix. Real fix will be to return a list of all result values for a given localId.
      const ctx = this.localId_context[localId];
      if ((ctx === false) || (ctx === null) || (ctx === undefined) || (ctx.length === 0)) {
        return this.localId_context[localId] = value;
      } else {
        return ctx;
      }
    }

    getLocalIdResult(localId) {
      return this.localId_context[localId];
    }

    // Returns an object of objects containing each library name
    // with the localIds and result values
    getAllLocalIds() {
      const localIdResults = {};
      // Add the localIds and result values from the main library
      localIdResults[this.parent.source.library.identifier.id] = {};
      localIdResults[this.parent.source.library.identifier.id] = this.localId_context;

      // Iterate over support libraries and store localIds
      for (let libName in this.library_context) {
        const lib = this.library_context[libName];
        this.supportLibraryLocalIds(lib, localIdResults);
      }
      return localIdResults;
    }

    // Recursive function that will grab nested support library localId results
    supportLibraryLocalIds(lib, localIdResults) {
      // Set library identifier name as the key and the object of localIds with their results as the value
      localIdResults[lib.library.source.library.identifier.id] = lib.localId_context;
      // Iterate over any support libraries in the current support library
      return (() => {
        const result = [];
        for (let supportLibName in lib.library_context) {
          const supportLib = lib.library_context[supportLibName];
          result.push(this.supportLibraryLocalIds(supportLib, localIdResults));
        }
        return result;
      })();
    }

    checkParameters(params) {
      for (let pName in params) {
        const pVal = params[pName];
        const pDef = this.getParameter(pName);
        if ((pVal == null)) {
          return; // Null can theoretically be any type
        }
        if (typeof pDef === 'undefined') {
          return; // This will happen if the parameter is declared in a different (included) library
        } else if ((pDef.parameterTypeSpecifier != null) && !this.matchesTypeSpecifier(pVal, pDef.parameterTypeSpecifier)) {
          throw new Error(`Passed in parameter '${pName}' is wrong type`);
        } else if ((pDef['default'] != null) && !this.matchesInstanceType(pVal, pDef['default'])) {
          throw new Error(`Passed in parameter '${pName}' is wrong type`);
        }
      }
      return true;
    }

    matchesTypeSpecifier(val, spec) {
      switch (spec.type) {
      case 'NamedTypeSpecifier': return this.matchesNamedTypeSpecifier(val, spec);
      case 'ListTypeSpecifier': return this.matchesListTypeSpecifier(val, spec);
      case 'TupleTypeSpecifier': return this.matchesTupleTypeSpecifier(val, spec);
      case 'IntervalTypeSpecifier': return this.matchesIntervalTypeSpecifier(val, spec);
      default: return true; // default to true when we don't know
      }
    }

    matchesListTypeSpecifier(val, spec) {
      return typeIsArray(val) && val.every(x => this.matchesTypeSpecifier(x, spec.elementType));
    }

    matchesTupleTypeSpecifier(val, spec) {
      return (typeof val === 'object') &&
        !typeIsArray(val) &&
        spec.element.every(x => ((typeof val[x.name] === 'undefined') || this.matchesTypeSpecifier(val[x.name], x.type)));
    }

    matchesIntervalTypeSpecifier(val, spec) {
      return ((val.constructor != null ? val.constructor.name : undefined) === 'Interval') &&
        (((val.low == null)) || this.matchesTypeSpecifier(val.low, spec.pointType)) &&
        (((val.high == null)) || this.matchesTypeSpecifier(val.high, spec.pointType));
    }

    matchesNamedTypeSpecifier(val, spec) {
      switch (spec.name) {
      case '{urn:hl7-org:elm-types:r1}Boolean': return typeof val === 'boolean';
      case '{urn:hl7-org:elm-types:r1}Decimal': return typeof val === 'number';
      case '{urn:hl7-org:elm-types:r1}Integer': return (typeof val === 'number') && (Math.floor(val) === val);
      case '{urn:hl7-org:elm-types:r1}String': return typeof val === 'string';
      case '{urn:hl7-org:elm-types:r1}Concept': return __guard__(val != null ? val.constructor : undefined, x => x.name) === 'Concept';
      case '{urn:hl7-org:elm-types:r1}DateTime': return __guard__(val != null ? val.constructor : undefined, x1 => x1.name) === 'DateTime';
      case '{urn:hl7-org:elm-types:r1}Quantity': return __guard__(val != null ? val.constructor : undefined, x2 => x2.name) === 'Quantity';
      case '{urn:hl7-org:elm-types:r1}Time': return (__guard__(val != null ? val.constructor : undefined, x3 => x3.name) === 'DateTime') && val.isTime();
      default: return true; // TODO: Better checking of custom or complex types
      }
    }

    matchesInstanceType(val, inst) {
      switch ((inst.constructor != null ? inst.constructor.name : undefined)) {
      case 'BooleanLiteral': return typeof val === 'boolean';
      case 'DecimalLiteral': return typeof val === 'number';
      case 'IntegerLiteral': return (typeof val === 'number') && (Math.floor(val) === val);
      case 'StringLiteral': return typeof val === 'string';
      case 'Concept': return __guard__(val != null ? val.constructor : undefined, x => x.name) === 'Concept';
      case 'DateTime': return __guard__(val != null ? val.constructor : undefined, x1 => x1.name) === 'DateTime';
      case 'Quantity': return __guard__(val != null ? val.constructor : undefined, x2 => x2.name) === 'Quantity';
      case 'Time': return (__guard__(val != null ? val.constructor : undefined, x3 => x3.name) === 'DateTime') && val.isTime();
      case 'List': return this.matchesListInstanceType(val, inst);
      case 'Tuple': return this.matchesTupleInstanceType(val, inst);
      case 'Interval': return this.matchesIntervalInstanceType(val, inst);
      default: return true; // default to true when we don't know for sure
      }
    }

    matchesListInstanceType(val, list) {
      return typeIsArray(val) && val.every(x => this.matchesInstanceType(x, list.elements[0]));
    }

    matchesTupleInstanceType(val, tpl) {
      return (typeof val === 'object') &&
        !typeIsArray(val) &&
        tpl.elements.every(x => ((typeof val[x.name] === 'undefined') || this.matchesInstanceType(val[x.name], x.value)));
    }

    matchesIntervalInstanceType(val, ivl) {
      const pointType = ivl.low != null ? ivl.low : ivl.high;
      return ((val.constructor != null ? val.constructor.name : undefined) === 'Interval') &&
        (((val.low == null)) || this.matchesInstanceType(val.low, pointType)) &&
        (((val.high == null)) || this.matchesInstanceType(val.high, pointType));
    }
  };
  Context.initClass();
  return Context;
})());

module.exports.PatientContext = (PatientContext = class PatientContext extends Context {
  constructor(library,patient,codeService,parameters) {
    super(library, codeService, parameters);
    this.library = library;
    this.patient = patient;
  }

  rootContext() { return this; }

  getLibraryContext(library) {
    return this.library_context[library] || (this.library_context[library] = new PatientContext(this.get(library),this.patient,this.codeService,this.parameters));
  }

  getLocalIdContext(localId) {
    return this.localId_context[localId] || (this.localId_context[localId] = new PatientContext(this.get(library),this.patient,this.codeService,this.parameters));
  }

  findRecords( profile) {
    return (this.patient != null ? this.patient.findRecords(profile) : undefined);
  }
});



module.exports.PopulationContext = (PopulationContext = class PopulationContext extends Context {

  constructor(library, results, codeService, parameters) {
    super(library,codeService,parameters);
    this.library = library;
    this.results = results;
  }

  rootContext() { return this; }

  findRecords(template) {
    throw new Exception('Retreives are not currently supported in Population Context');
  }

  getLibraryContext(library) {
    throw new Exception('Library expressions are not currently supported in Population Context');
  }

  get(identifier) {
    //First check to see if the identifier is a population context expression that has already been cached
    if (this.context_values[identifier]) { return this.context_values[identifier]; }
    //if not look to see if the library has a population expression of that identifier
    if ((this.library[identifier] != null ? this.library[identifier].context : undefined) === 'Population') { return this.library.expressions[identifier]; }
    //lastley attempt to gather all patient level results that have that identifier
    // should this compact null values before return ?
    return (() => {
      const result = [];
      for (let pid in this.results.patientResults) {
        const res = this.results.patientResults[pid];
        result.push(res[identifier]);
      }
      return result;
    })();
  }
});


function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}