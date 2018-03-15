/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let Interval;
const { DateTime } = require('./datetime');
const { Uncertainty } = require('./uncertainty');
const { ThreeValuedLogic } = require('./logic');
const { successor, predecessor, maxValueForInstance, minValueForInstance } = require('../util/math');
const cmp = require('../util/comparison');

module.exports.Interval = (Interval = (function() {
  let areDateTimes = undefined;
  let areNumeric = undefined;
  let lowestNumericUncertainty = undefined;
  let highestNumericUncertainty = undefined;
  Interval = class Interval {
    static initClass() {
  
      areDateTimes = (x, y) => [x, y].every(z => z instanceof DateTime);
  
      areNumeric = (x, y) => [x, y].every(z => (typeof z === 'number') || (z instanceof Uncertainty && (typeof z.low === 'number')));
  
      lowestNumericUncertainty = function(x, y) {
        if (!(x instanceof Uncertainty)) { x = new Uncertainty(x); }
        if (!(y instanceof Uncertainty)) { y = new Uncertainty(y); }
        const low = x.low < y.low ? x.low : y.low;
        const high = x.high < y.high ? x.high : y.high;
        if (low !== high) { return new Uncertainty(low, high); } else { return low; }
      };
  
      highestNumericUncertainty = function(x, y) {
        if (!(x instanceof Uncertainty)) { x = new Uncertainty(x); }
        if (!(y instanceof Uncertainty)) { y = new Uncertainty(y); }
        const low = x.low > y.low ? x.low : y.low;
        const high = x.high > y.high ? x.high : y.high;
        if (low !== high) { return new Uncertainty(low, high); } else { return low; }
      };
    }
    constructor(low, high, lowClosed = true, highClosed = true) {
      this.low = low;
      this.high = high;
      this.lowClosed = lowClosed;
      this.highClosed = highClosed;
    }

    contains(item, precision) {
      if (item instanceof Interval) { throw new Error("Argument to contains must be a point"); }
      const closed = this.toClosed();
      return ThreeValuedLogic.and(
        cmp.lessThanOrEquals(closed.low, item, precision),
        cmp.greaterThanOrEquals(closed.high, item, precision)
      );
    }

    properlyIncludes(other, precision) {
      if (!(other instanceof Interval)) { throw new Error("Argument to properlyIncludes must be an interval"); }
      return ThreeValuedLogic.and(
        this.includes(other, precision),
        ThreeValuedLogic.not(other.includes(this, precision))
      );
    }

    includes(other, precision) {
      if (!(other instanceof Interval)) { throw new Error("Argument to includes must be an interval"); }
      const a = this.toClosed();
      const b = other.toClosed();
      return ThreeValuedLogic.and(
        cmp.lessThanOrEquals(a.low, b.low, precision),
        cmp.greaterThanOrEquals(a.high, b.high, precision)
      );
    }

    includedIn(other) {
      if (!(other instanceof Interval)) { throw new Error("Argument to includedIn must be an interval"); }
      return other.includes(this);
    }

    overlaps(item, precision) {
      const closed = this.toClosed();
      const [low, high] = Array.from((() => {
        if (item instanceof Interval) {
        const itemClosed = item.toClosed();
        return [itemClosed.low, itemClosed.high];
      } else {
        return [item, item];
      }
      })());
      return ThreeValuedLogic.and(
        cmp.lessThanOrEquals(closed.low, high, precision),
        cmp.greaterThanOrEquals(closed.high, low, precision)
      );
    }

    overlapsAfter(item, precision) {
      const closed = this.toClosed();
      const high = item instanceof Interval ? item.toClosed().high : item;
      return ThreeValuedLogic.and(
        cmp.lessThanOrEquals(closed.low, high, precision),
        cmp.greaterThan(closed.high, high, precision)
      );
    }

    overlapsBefore(item, precision) {
      const closed = this.toClosed();
      const low = item instanceof Interval ? item.toClosed().low : item;
      return ThreeValuedLogic.and(
        cmp.lessThan(closed.low, low, precision),
        cmp.greaterThanOrEquals(closed.high, low, precision)
      );
    }

    union(other) {
      if (!(other instanceof Interval)) { throw new Error("Argument to union must be an interval"); }
      // Note that interval union is only defined if the arguments overlap or meet.
      if (this.overlaps(other) || this.meets(other)) {
        const [a, b] = Array.from([this.toClosed(), other.toClosed()]);
        const [l, lc] = Array.from((() => { switch (false) {
          case !cmp.lessThanOrEquals(a.low, b.low): return [this.low, this.lowClosed];
          case !cmp.greaterThanOrEquals(a.low, b.low): return [other.low, other.lowClosed];
          case !areNumeric(a.low, b.low): return [lowestNumericUncertainty(a.low, b.low), true];
          // TODO: Do we need to support quantities here?
          case !areDateTimes(a.low, b.low) || !a.low.isMorePrecise(b.low): return [other.low, other.lowClosed];
          default: return [this.low, this.lowClosed];
        } })());
        const [h, hc] = Array.from((() => { switch (false) {
          case !cmp.greaterThanOrEquals(a.high, b.high): return [this.high, this.highClosed];
          case !cmp.lessThanOrEquals(a.high, b.high): return [other.high, other.highClosed];
          case !areNumeric(a.low, b.low): return [highestNumericUncertainty(a.high, b.high), true];
          // TODO: Do we need to support quantities here?
          case !areDateTimes(a.high, b.high) || !a.high.isMorePrecise(b.high): return [other.high, other.highClosed];
          default: return [this.high, this.highClosed];
        } })());
        return new Interval(l, h, lc, hc);
      } else {
        return null;
      }
    }

    intersect(other) {
      if (!(other instanceof Interval)) { throw new Error("Argument to union must be an interval"); }
      // Note that interval union is only defined if the arguments overlap.
      if (this.overlaps(other)) {
        const [a, b] = Array.from([this.toClosed(), other.toClosed()]);
        const [l, lc] = Array.from((() => { switch (false) {
          case !cmp.greaterThanOrEquals(a.low, b.low): return [this.low, this.lowClosed];
          case !cmp.lessThanOrEquals(a.low, b.low): return [other.low, other.lowClosed];
          case !areNumeric(a.low, b.low): return [highestNumericUncertainty(a.low, b.low), true];
          // TODO: Do we need to support quantities here?
          case !areDateTimes(a.low, b.low) || !b.low.isMorePrecise(a.low): return [other.low, other.lowClosed];
          default: return [this.low, this.lowClosed];
        } })());
        const [h, hc] = Array.from((() => { switch (false) {
          case !cmp.lessThanOrEquals(a.high, b.high): return [this.high, this.highClosed];
          case !cmp.greaterThanOrEquals(a.high, b.high): return [other.high, other.highClosed];
          case !areNumeric(a.low, b.low): return [lowestNumericUncertainty(a.high, b.high), true];
          // TODO: Do we need to support quantities here?
          case !areDateTimes(a.high, b.high) || !b.high.isMorePrecise(a.high): return [other.high, other.highClosed];
          default: return [this.high, this.highClosed];
        } })());
        return new Interval(l, h, lc, hc);
      } else {
        return null;
      }
    }

    except(other) {
      if (other === null) { return null; }
      if (!(other instanceof Interval)) { throw new Error("Argument to except must be an interval"); }

      const ol = this.overlaps(other);
      if (ol === true) {
        const olb = this.overlapsBefore(other);
        const ola = this.overlapsAfter(other);
        if ((olb === true) && (ola === false)) { return new Interval(this.low, other.low, this.lowClosed, !other.lowClosed);
        } else if ((ola === true) && (olb === false)) { return new Interval(other.high, this.high, !other.highClosed, this.highClosed);
        } else { return null; }
      } else if (ol === false) {
        return this;
      } else { // ol is null
        return null;
      }
    }

    equals(other) {
      if (other instanceof Interval) {
        const [a, b] = Array.from([this.toClosed(), other.toClosed()]);
        return ThreeValuedLogic.and(
          cmp.equals(a.low, b.low),
          cmp.equals(a.high, b.high)
        );
      } else {
        return false;
      }
    }

    after(other, precision) {
      const closed = this.toClosed();
      // Meets spec, but not 100% correct (e.g., (null, 5] after [6, 10] --> null)
      // Simple way to fix it: and w/ not overlaps
      if (!!other.toClosed) {
        return cmp.greaterThan(closed.low, other.toClosed().high, precision);
      } else {
        return cmp.greaterThan(closed.low, other, precision);
      }
    }

    before(other, precision) {
      const closed = this.toClosed();
      // Meets spec, but not 100% correct (e.g., (null, 5] after [6, 10] --> null)
      // Simple way to fix it: and w/ not overlaps
      if (!!other.toClosed) {
        return cmp.lessThan(closed.high, other.toClosed().low, precision);
      } else {
        return cmp.lessThan(closed.high, other, precision);
      }
    }

    meets(other, precision) {
      return ThreeValuedLogic.or(
        this.meetsBefore(other, precision),
        this.meetsAfter(other, precision)
      );
    }

    meetsAfter(other, precision) {
      try {
        if ((precision != null) && this.low instanceof DateTime) {
          return this.toClosed().low.sameAs(__guard__(other.toClosed().high, x => x.add(1, precision)), precision);
        } else {
          return cmp.equals(this.toClosed().low, successor(other.toClosed().high));
        }
      } catch (error) {
        return false;
      }
    }

    meetsBefore(other, precision) {
      try {
        if ((precision != null) && this.high instanceof DateTime) {
          return this.toClosed().high.sameAs(__guard__(other.toClosed().low, x => x.add(-1, precision)), precision);
        } else {
          return cmp.equals(this.toClosed().high, predecessor(other.toClosed().low));
        }
      } catch (error) {
        return false;
      }
    }

    width() {
      if (this.low instanceof DateTime || this.high instanceof DateTime) {
        throw new Error("Width of DateTime intervals is not supported");
      }

      const closed = this.toClosed();
      if (closed.low instanceof Uncertainty || closed.high instanceof Uncertainty) {
        return null;
      } else {
        // TODO: Fix precision to 8 decimals in other places that return numbers
        const diff = Math.abs(closed.high - closed.low);
        return Math.round(diff * Math.pow(10, 8)) / Math.pow(10, 8);
      }
    }


    toClosed() {
      let high, low;
      const point = this.low != null ? this.low : this.high;
      if ((typeof(point) === 'number') || point instanceof DateTime || (__guard__(point != null ? point.constructor : undefined, x => x.name) === 'Quantity')) {
        low = (() => { switch (false) {
          case !this.lowClosed || !(this.low == null): return minValueForInstance(point);
          case !!this.lowClosed || (this.low == null): return successor(this.low);
          default: return this.low;
        } })();
        high = (() => { switch (false) {
          case !this.highClosed || !(this.high == null): return maxValueForInstance(point);
          case !!this.highClosed || (this.high == null): return predecessor(this.high);
          default: return this.high;
        } })();
        if ((low == null)) { low = new Uncertainty(minValueForInstance(point), high); }
        if ((high == null)) { high = new Uncertainty(low, maxValueForInstance(point)); }
        return new Interval(low, high, true, true);
      } else {
        return new Interval(this.low, this.high, true, true);
      }
    }
  };
  Interval.initClass();
  return Interval;
})());

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}