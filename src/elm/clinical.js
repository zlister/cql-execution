/* eslint-disable
    no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS104: Avoid inline assignments
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let CalculateAge, CalculateAgeAt, CodeDef, CodeRef, CodeSystemDef, Concept, ConceptDef, ConceptRef, InValueSet, ValueSetDef, ValueSetRef;
const { Expression } = require('./expression');
const dt = require('../datatypes/datatypes');
const { build } = require('./builder');

module.exports.ValueSetDef = (ValueSetDef = class ValueSetDef extends Expression {
  constructor(json) {
    super(...arguments);
    this.name = json.name;
    this.id = json.id;
    this.version = json.version;
  }
  //todo: code systems and versions

  exec(ctx) {
    let left;
    const valueset = (left = ctx.codeService.findValueSet(this.id, this.version)) != null ? left : new dt.ValueSet(this.id, this.version);
    ctx.rootContext().set(this.name, valueset);
    return valueset;
  }
});

module.exports.ValueSetRef = (ValueSetRef = class ValueSetRef extends Expression {
  constructor(json) {
    super(...arguments);
    this.name = json.name;
  }

  exec(ctx) {
    // TODO: This calls the code service every time-- should be optimized
    let valueset = ctx.getValueSet(this.name);
    if (valueset instanceof Expression) {
      valueset = valueset.execute(ctx);
    }
    return valueset;
  }
});

module.exports.InValueSet = (InValueSet = class InValueSet extends Expression {
  constructor(json) {
    super(...arguments);
    this.code = build(json.code);
    this.valueset = new ValueSetRef(json.valueset);
  }

  exec(ctx) {
    // Bonnie-633 Added null check
    // spec indicates to return null if code is null, false is value set is null
    if (this.code == null) { return null; }
    if (this.valueset == null) { return false; }
    const code = this.code.execute(ctx);
    // spec indicates to return null if code is null, false is value set is null
    if (code == null) { return null; }
    const valueset = this.valueset.execute(ctx);
    if (valueset != null) { return valueset.hasMatch(code); } else { return false; }
  }
});

module.exports.CodeSystemDef = (CodeSystemDef = class CodeSystemDef extends Expression {
  constructor(json) {
    super(...arguments);
    this.name = json.name;
    this.id = json.id;
    this.version = json.version;
  }

  exec(ctx) {
    return new dt.CodeSystem(this.id, this.version);
  }
});

module.exports.CodeDef = (CodeDef = class CodeDef extends Expression {
  constructor(json) {
    super(...arguments);
    this.name = json.name;
    this.id = json.id;
    this.systemName = json.codeSystem.name;
    this.display = json.display;
  }

  exec(ctx) {
    const system = __guard__(ctx.getCodeSystem(this.systemName), x => x.execute(ctx));
    return new dt.Code(this.id, system.id, system.version, this.display);
  }
});

module.exports.CodeRef = (CodeRef = class CodeRef extends Expression {
  constructor(json) {
    super(...arguments);
    this.name = json.name;
  }

  exec(ctx) {
    return __guard__(ctx.getCode(this.name), x => x.execute(ctx));
  }
});

module.exports.ConceptDef = (ConceptDef = class ConceptDef extends Expression {
  constructor(json) {
    super(...arguments);
    this.name = json.name;
    this.display = json.display;
    this.codes = json.code;
  }

  exec(ctx) {
    const codes = (this.codes.map((code) => __guard__(ctx.getCode(code.name), x => x.execute(ctx))));
    return new dt.Concept(codes, this.display);
  }
});

module.exports.ConceptRef = (ConceptRef = class ConceptRef extends Expression {
  constructor(json) {
    super(...arguments);
    this.name = json.name;
  }

  exec(ctx) {
    return __guard__(ctx.getConcept(this.name), x => x.execute(ctx));
  }
});

module.exports.Concept = (Concept = class Concept extends Expression {
  constructor(json) {
    super(...arguments);
    this.codes = json.code;
    this.display = json.display;
  }

  get isConcept() { return true; }

  toCode(ctx, code) {
    const system = __guard__(ctx.getCodeSystem(code.system.name), x => x.id);
    return new dt.Code(code.code, system, code.version, code.display);
  }

  exec(ctx) {
    const codes = (this.codes.map((code) => this.toCode(ctx, code)));
    return new dt.Concept(codes, this.display);
  }
});

module.exports.CalculateAge = (CalculateAge = class CalculateAge extends Expression {
  constructor(json) {
    super(...arguments);
    this.precision = json.precision;
  }

  exec(ctx) {
    const date1 = this.execArgs(ctx);
    const date2 = dt.DateTime.fromDate(new Date());
    const result = date1 != null ? date1.durationBetween(date2, this.precision.toLowerCase()) : undefined;
    if ((result != null) && result.isPoint()) { return result.low; } else { return result; }
  }
});

module.exports.CalculateAgeAt = (CalculateAgeAt = class CalculateAgeAt extends Expression {
  constructor(json) {
    super(...arguments);
    this.precision = json.precision;
  }

  exec(ctx) {
    const [date1, date2] = Array.from(this.execArgs(ctx));
    if ((date1 != null) && (date2 != null)) {
      const result = date1.durationBetween(date2, this.precision.toLowerCase());
      if ((result != null) && result.isPoint()) { return result.low; } else { return result; }
    } else {
      return null;
    }
  }
});

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}