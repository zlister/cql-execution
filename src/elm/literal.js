/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let BooleanLiteral, DecimalLiteral, IntegerLiteral, Literal, StringLiteral;
const { Expression } = require('./expression');

module.exports.Literal = (Literal = class Literal extends Expression {
  static from(json) {
    switch(json.valueType) {
      case "{urn:hl7-org:elm-types:r1}Boolean": return new BooleanLiteral(json);
      case "{urn:hl7-org:elm-types:r1}Integer": return new IntegerLiteral(json);
      case "{urn:hl7-org:elm-types:r1}Decimal": return new DecimalLiteral(json);
      case "{urn:hl7-org:elm-types:r1}String": return new StringLiteral(json);
      default: return new Literal(json);
    }
  }

  constructor(json) {
    super(...arguments);
    this.valueType = json.valueType;
    this.value = json.value;
  }

  exec(ctx) {
    return this.value;
  }
});

// The following are not defined in ELM, but helpful for execution

module.exports.BooleanLiteral = (BooleanLiteral = class BooleanLiteral extends Literal {
  constructor(json) {
    super(...arguments);
    this.value = this.value === 'true';
  }

  exec(ctx) {
    return this.value;
  }
});

module.exports.IntegerLiteral = (IntegerLiteral = class IntegerLiteral extends Literal {
  constructor(json) {
    super(...arguments);
    this.value = parseInt(this.value, 10);
  }

  exec(ctx) {
    return this.value;
  }
});

module.exports.DecimalLiteral = (DecimalLiteral = class DecimalLiteral extends Literal {
  constructor(json) {
    super(...arguments);
    this.value = parseFloat(this.value);
  }

  exec(ctx) {
    return this.value;
  }
});

module.exports.StringLiteral = (StringLiteral = class StringLiteral extends Literal {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    // TODO: Remove these replacements when CQL-to-ELM fixes bug: https://github.com/cqframework/clinical_quality_language/issues/82
    return this.value.replace(/\\'/g, "'").replace(/\\"/g, "\"");
  }
});
