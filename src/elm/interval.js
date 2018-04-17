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
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let Collapse, doIncludes, End, Ends, Interval, Meets, MeetsAfter, MeetsBefore, Overlaps, OverlapsAfter, OverlapsBefore, Start, Starts, Width;
const { Expression, UnimplementedExpression } = require('./expression');
const { ThreeValuedLogic } = require('../datatypes/logic');
const { build } = require('./builder');
const dtivl = require('../datatypes/interval');
const cmp = require('../util/comparison');


module.exports.Interval = (Interval = class Interval extends Expression {
  constructor(json) {
    super(...arguments);
    this.lowClosed = json.lowClosed;
    this.highClosed = json.highClosed;
    this.low = build(json.low);
    this.high = build(json.high);
  }

  get isInterval() { return true; }

  exec(ctx) {
    return new dtivl.Interval(this.low.execute(ctx), this.high.execute(ctx), this.lowClosed, this.highClosed);
  }
});

// Equal is completely handled by overloaded#Equal

// NotEqual is completely handled by overloaded#Equal

// Delegated to by overloaded#Contains and overloaded#In
module.exports.doContains = (interval, item, precision) => interval.contains(item, precision);

// Delegated to by overloaded#Includes and overloaded#IncludedIn
module.exports.doIncludes = (doIncludes = (interval, subinterval, precision) => interval.includes(subinterval, precision));

// Delegated to by overloaded#ProperIncludes and overloaded@ProperIncludedIn
module.exports.doProperIncludes = (interval, subinterval, precision) => interval.properlyIncludes(subinterval, precision);

// Delegated to by overloaded#After
module.exports.doAfter = (a, b, precision) => a.after(b, precision);

// Delegated to by overloaded#Before
module.exports.doBefore = (a, b, precision) => a.before(b, precision);

module.exports.Meets = (Meets = class Meets extends Expression {
  constructor(json) {
    super(...arguments);
    this.precision = json.precision != null ? json.precision.toLowerCase() : undefined;
  }

  exec(ctx) {
    const [a, b] = Array.from(this.execArgs(ctx));
    if ((a != null) && (b != null)) { return a.meets(b, this.precision); } else { return null; }
  }
});

module.exports.MeetsAfter = (MeetsAfter = class MeetsAfter extends Expression {
  constructor(json) {
    super(...arguments);
    this.precision = json.precision != null ? json.precision.toLowerCase() : undefined;
  }

  exec(ctx) {
    const [a, b] = Array.from(this.execArgs(ctx));
    if ((a != null) && (b != null)) { return a.meetsAfter(b, this.precision); } else { return null; }
  }
});

module.exports.MeetsBefore = (MeetsBefore = class MeetsBefore extends Expression {
  constructor(json) {
    super(...arguments);
    this.precision = json.precision != null ? json.precision.toLowerCase() : undefined;
  }

  exec(ctx) {
    const [a, b] = Array.from(this.execArgs(ctx));
    if ((a != null) && (b != null)) { return a.meetsBefore(b, this.precision); } else { return null; }
  }
});

module.exports.Overlaps = (Overlaps = class Overlaps extends Expression {
  constructor(json) {
    super(...arguments);
    this.precision = json.precision != null ? json.precision.toLowerCase() : undefined;
  }

  exec(ctx) {
    const [a, b] = Array.from(this.execArgs(ctx));
    if ((a != null) && (b != null)) { return a.overlaps(b, this.precision); } else { return null; }
  }
});

module.exports.OverlapsAfter = (OverlapsAfter = class OverlapsAfter extends Expression {
  constructor(json) {
    super(...arguments);
    this.precision = json.precision != null ? json.precision.toLowerCase() : undefined;
  }

  exec(ctx) {
    const [a, b] = Array.from(this.execArgs(ctx));
    if ((a != null) && (b != null)) { return a.overlapsAfter(b, this.precision); } else { return null; }
  }
});

module.exports.OverlapsBefore = (OverlapsBefore = class OverlapsBefore extends Expression {
  constructor(json) {
    super(...arguments);
    this.precision = json.precision != null ? json.precision.toLowerCase() : undefined;
  }

  exec(ctx) {
    const [a, b] = Array.from(this.execArgs(ctx));
    if ((a != null) && (b != null)) { return a.overlapsBefore(b, this.precision); } else { return null; }
  }
});

// Delegated to by overloaded#Union
module.exports.doUnion = (a, b) => a.union(b);

// Delegated to by overloaded#Except
module.exports.doExcept = function(a, b) {
  if ((a != null) && (b != null)) { return a.except(b); } else { return null; }
};

// Delegated to by overloaded#Intersect
module.exports.doIntersect = function(a, b) {
  if ((a != null) && (b != null)) { return a.intersect(b); } else { return null; }
};

module.exports.Width = (Width = class Width extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    return __guard__(this.arg.execute(ctx), x => x.width());
  }
});

// TODO: Spec has "Begin" defined, but shouldn't it be "Start"?
module.exports.Start = (Start = class Start extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    return __guard__(this.arg.execute(ctx), x => x.low);
  }
});

module.exports.End = (End = class End  extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    return __guard__(this.arg.execute(ctx), x => x.high);
  }
});

// TODO: Spec has "Begins" defined, but shouldn't it be "Starts"?
module.exports.Starts = (Starts = class Starts extends UnimplementedExpression {});

module.exports.Ends = (Ends = class Ends extends UnimplementedExpression {});

module.exports.Collapse = (Collapse = class Collapse extends Expression {
  constructor(json) {
    super(...arguments);
  }

  exec(ctx) {
    const intervals = this.execArgs(ctx);
    if ((intervals != null ? intervals.length : undefined) <= 1) {
      return intervals;
    } else {
      // we don't handle imprecise intervals at this time
      for (var a of intervals) {
        if ((typeof a.low.isImprecise === 'function' ? a.low.isImprecise() : undefined) || (typeof a.high.isImprecise === 'function' ? a.high.isImprecise() : undefined)) {
          throw new Error('Collapse does not support imprecise dates at this time.');
        }
      }

      // sort intervals by start
      intervals.sort(function(a,b){
        if (typeof a.low.before === 'function') {
          if (a.low.before(b.low)) { return -1; }
          if (a.low.after(b.low)) { return 1; }
        } else {
          if (a.low < b.low) { return -1; }
          if (a.low > b.low) { return 1; }
        }
        return 0;
      });

      // collapse intervals as necessary
      const collapsedIntervals = [];
      a = intervals.shift();
      let b = intervals.shift();
      while (b) {
        if (typeof b.low.sameOrBefore === 'function') {
          if (b.low.sameOrBefore(a.high)) {
            if (b.high.after(a.high)) { a.high = b.high; }
          } else {
            collapsedIntervals.push(a);
            a = b;
          }
        } else {
          if (b.low <= a.high) {
            if (b.high > a.high) { a.high = b.high; }
          } else {
            collapsedIntervals.push(a);
            a = b;
          }
        }
        b = intervals.shift();
      }
      collapsedIntervals.push(a);
      return collapsedIntervals;
    }
  }
});


function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}