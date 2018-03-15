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
let Combine, Concatenate, Lower, PositionOf, Split, Substring, Upper;
const { Expression } = require('./expression');
const { build } = require('./builder');

module.exports.Concatenate = (Concatenate = class Concatenate extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const args = this.execArgs(ctx);
    if (args.some(x => x == null)) { return null; } else { return args.reduce((x,y) => x + y); }
  }
});

module.exports.Combine = (Combine = class Combine extends Expression {
  constructor(json) {
    super(...arguments);
    this.source = build(json.source);
    this.separator = build(json.separator);
  }

  exec(ctx) {
    const source = this.source.execute(ctx);
    const separator = (this.separator != null) ? this.separator.execute(ctx) : '';
    if ((source == null) || source.some(x => x == null)) { return null; } else { return source.join(separator); }
  }
});

module.exports.Split = (Split = class Split extends Expression {
  constructor(json) {
    super(...arguments);
    this.stringToSplit = build(json.stringToSplit);
    this.separator = build(json.separator);
  }

  exec(ctx) {
    const stringToSplit = this.stringToSplit.execute(ctx);
    const separator = this.separator.execute(ctx);
    if (!((stringToSplit != null) && (separator != null))) { return null; } else { return stringToSplit.split(separator); }
  }
});

// Length is completely handled by overloaded#Length

module.exports.Upper = (Upper = class Upper extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if (arg != null) { return arg.toUpperCase(); } else { return null; }
  }
});

module.exports.Lower = (Lower = class Lower extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const arg = this.execArgs(ctx);
    if (arg != null) { return arg.toLowerCase(); } else { return null; }
  }
});

// Indexer is completely handled by overloaded#Indexer

module.exports.PositionOf = (PositionOf = class PositionOf extends Expression {
  constructor(json) {
    super(...arguments);
    this.pattern = build(json.pattern);
    this.string = build(json.string);
  }

  exec(ctx) {
    const pattern = this.pattern.execute(ctx);
    const string = this.string.execute(ctx);
    if (!((pattern != null) && (string != null))) { return null; } else { return string.indexOf(pattern); }
  }
});

module.exports.Substring = (Substring = class Substring extends Expression {
  constructor(json) {
    super(...arguments);
    this.stringToSub = build(json.stringToSub);
    this.startIndex = build(json.startIndex);
    this.length = build(json['length']);
  }

  exec(ctx) {
    const stringToSub = this.stringToSub.execute(ctx);
    const startIndex = this.startIndex.execute(ctx);
    const length = (this.length != null) ? this.length.execute(ctx) : null;
    // According to spec: If stringToSub or startIndex is null, or startIndex is out of range, the result is null.
    if ((stringToSub == null) || (startIndex == null) || (startIndex < 0) || (startIndex >= stringToSub.length)) {
      return null;
    } else if (length != null) {
      return stringToSub.substr(startIndex, length);
    } else {
      return stringToSub.substr(startIndex);
    }
  }
});
