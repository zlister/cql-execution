/* eslint-disable
    no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let As, Convert, IntervalTypeSpecifier, Is, ListTypeSpecifier, NamedTypeSpecifier, ToBoolean, ToConcept, ToDateTime, ToDecimal, ToInteger, ToQuantity, ToString, ToTime, TupleTypeSpecifier;
const { Expression, UnimplementedExpression } = require('./expression');
const { FunctionRef } = require('./reusable');
const { DateTime } = require('../datatypes/datetime');
const { Concept } = require('../datatypes/clinical');
const { parseQuantity } = require('./quantity');

// TODO: Casting and Conversion needs unit tests!

module.exports.As = (As = class As extends Expression {
  constructor(json) {
    super(...arguments);
    this.asType = json.asType;
    this.asTypeSpecifier = json.asTypeSpecifier;
    this.strict = json.strict != null ? json.strict : false;
  }

  exec(ctx) {
    // TODO: Currently just returns the arg (which works for null, but probably not others)
    return this.execArgs(ctx);
  }
});

module.exports.ToBoolean = (ToBoolean = class ToBoolean extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if ((arg != null) && (typeof arg !== 'undefined')) {
      const strArg = arg.toString();
      if (['true', 't', 'yes', 'y', '1'].includes(strArg)) {
        return true;
      } else if (['false', 'f', 'no', 'n', '0'].includes(strArg)) {
        return false;
      } else {
        throw new Error(`cannot convert ${strArg} to Boolean`);
      }
    } else {
      return null;
    }
  }
});

module.exports.ToConcept = (ToConcept = class ToConcept extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if ((arg != null) && (typeof arg !== 'undefined')) { return new Concept([arg], arg.display); } else { return null; }
  }
});

module.exports.ToDateTime = (ToDateTime = class ToDateTime extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if ((arg != null) && (typeof arg !== 'undefined')) { return DateTime.parse(arg.toString()); } else { return null; }
  }
});

module.exports.ToDecimal = (ToDecimal = class ToDecimal extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if ((arg != null) && (typeof arg !== 'undefined')) { return parseFloat(arg.toString()); } else { return null; }
  }
});

module.exports.ToInteger = (ToInteger = class ToInteger extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if ((arg != null) && (typeof arg !== 'undefined')) { return parseInt(arg.toString()); } else { return null; }
  }
});

module.exports.ToQuantity = (ToQuantity = class ToQuantity extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if ((arg != null) && (typeof arg !== 'undefined')) { return parseQuantity(arg.toString()); } else { return null; }
  }
});

module.exports.ToString = (ToString = class ToString extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if ((arg != null) && (typeof arg !== 'undefined')) { return arg.toString(); } else { return null; }
  }
});

module.exports.ToTime = (ToTime = class ToTime extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if ((arg != null) && (typeof arg !== 'undefined')) {
      const dt = DateTime.parse(arg.toString());
      if ((dt != null) && (typeof dt !== 'undefined')) { return dt.getTime(); } else { return null; }
    } else {
      return null;
    }
  }
});

module.exports.Convert = (Convert = class Convert extends Expression {
  constructor(json) {
    super(...arguments);
    this.operand = json.operand;
    this.toType = json.toType;
  }

  exec(ctx) {
    switch (this.toType) {
    case '{urn:hl7-org:elm-types:r1}Boolean':
      return new ToBoolean({'type': 'ToBoolean', 'operand': this.operand}).execute(ctx);
    case '{urn:hl7-org:elm-types:r1}Concept':
      return new ToConcept({'type': 'ToConcept', 'operand': this.operand}).execute(ctx);
    case '{urn:hl7-org:elm-types:r1}Decimal':
      return new ToDecimal({'type': 'ToDecimal', 'operand': this.operand}).execute(ctx);
    case '{urn:hl7-org:elm-types:r1}Integer':
      return new ToInteger({'type': 'ToInteger', 'operand': this.operand}).execute(ctx);
    case '{urn:hl7-org:elm-types:r1}String':
      return new ToString({'type': 'ToString', 'operand': this.operand}).execute(ctx);
    case '{urn:hl7-org:elm-types:r1}Quantity':
      return new ToQuantity({'type': 'ToQuantity', 'operand': this.operand}).execute(ctx);
    case '{urn:hl7-org:elm-types:r1}DateTime':
      return new ToDateTime({'type': 'ToDateTime', 'operand': this.operand}).execute(ctx);
    case '{urn:hl7-org:elm-types:r1}Time':
      return new ToTime({'type': 'ToTime', 'operand': this.operand}).execute(ctx);
    default:
      return this.execArgs(ctx);
    }
  }
});

module.exports.Is = (Is = class Is extends UnimplementedExpression {});

module.exports.IntervalTypeSpecifier = (IntervalTypeSpecifier = class IntervalTypeSpecifier extends UnimplementedExpression {});

module.exports.ListTypeSpecifier = (ListTypeSpecifier = class ListTypeSpecifier extends UnimplementedExpression {});

module.exports.NamedTypeSpecifier = (NamedTypeSpecifier = class NamedTypeSpecifier extends UnimplementedExpression {});

module.exports.TupleTypeSpecifier = (TupleTypeSpecifier = class TupleTypeSpecifier extends UnimplementedExpression {});
