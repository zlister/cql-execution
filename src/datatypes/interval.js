const { DateTime } = require('./datetime');
const { Uncertainty } = require('./uncertainty');
const { ThreeValuedLogic } = require('./logic');
const { successor, predecessor, maxValueForInstance, minValueForInstance } = require('../util/math');
const cmp = require('../util/comparison');

class Interval {
  constructor(low, high, lowClosed = true, highClosed = true) {
    this.low = low;
    this.high = high;
    this.lowClosed = lowClosed;
    this.highClosed = highClosed;
  }

  contains(item, precision) {
    if (item instanceof Interval) {
      throw new Error('Argument to contains must be a point');
    }
    const closed = this.toClosed();
    return ThreeValuedLogic.and(
      cmp.lessThanOrEquals(closed.low, item, precision),
      cmp.greaterThanOrEquals(closed.high, item, precision)
    );
  }

  properlyIncludes(other, precision) {
    if (!(other instanceof Interval)) {
      throw new Error('Argument to properlyIncludes must be an interval');
    }
    return ThreeValuedLogic.and(
      this.includes(other, precision),
      ThreeValuedLogic.not(other.includes(this, precision))
    );
  }

  includes(other, precision) {
    if (!(other instanceof Interval)) {
      throw new Error('Argument to includes must be an interval');
    }
    const a = this.toClosed();
    const b = other.toClosed();
    return ThreeValuedLogic.and(
      cmp.lessThanOrEquals(a.low, b.low, precision),
      cmp.greaterThanOrEquals(a.high, b.high, precision)
    );
  }

  includedIn(other) {
    if (!(other instanceof Interval)) {
      throw new Error('Argument to includedIn must be an interval');
    }
    return other.includes(this);
  }

  overlaps(item, precision) {
    const closed = this.toClosed();
    let low, high;
    if (item instanceof Interval) {
      const itemClosed = item.toClosed();
      [low, high] = [itemClosed.low, itemClosed.high];
    } else {
      [low, high] = [item, item];
    }
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
    if (!(other instanceof Interval)) { throw new Error('Argument to union must be an interval'); }
    // Note that interval union is only defined if the arguments overlap or meet.
    if (this.overlaps(other) || this.meets(other)) {
      const [a, b] = [this.toClosed(), other.toClosed()];

      let l, lc;
      if (cmp.lessThanOrEquals(a.low, b.low)) {
        [l, lc] = [this.low, this.lowClosed];
      } else if (cmp.greaterThanOrEquals(a.low, b.low)) {
        [l, lc] = [other.low, other.lowClosed];
      } else if (areNumeric(a.low, b.low)) {
        [l, lc] = [lowestNumericUncertainty(a.low, b.low), true];
      // TODO: Do we need to support quantities here?
      } else if (areDateTimes(a.low, b.low) && a.low.isMorePrecise(b.low)) {
        [l, lc] = [other.low, other.lowClosed];
      } else {
        [l, lc] = [this.low, this.lowClosed];
      }

      let h, hc;
      if (cmp.greaterThanOrEquals(a.high, b.high)) {
        [h, hc] = [this.high, this.highClosed];
      } else if (cmp.lessThanOrEquals(a.high, b.high)) {
        [h, hc] = [other.high, other.highClosed];
      } else if (areNumeric(a.low, b.low)) {
        [h, hc] = [highestNumericUncertainty(a.high, b.high), true];
      // TODO: Do we need to support quantities here?
      } else if (areDateTimes(a.high, b.high) && a.high.isMorePrecise(b.high)) {
        [h, hc] = [other.high, other.highClosed];
      } else {
        [h, hc] = [this.high, this.highClosed];
      }

      return new Interval(l, h, lc, hc);
    }
    return null;
  }

  intersect(other) {
    if (!(other instanceof Interval)) { throw new Error('Argument to union must be an interval'); }
    // Note that interval union is only defined if the arguments overlap.
    if (this.overlaps(other)) {
      const [a, b] = [this.toClosed(), other.toClosed()];

      let l, lc;
      if (cmp.greaterThanOrEquals(a.low, b.low)) {
        [l, lc] = [this.low, this.lowClosed];
      } else if (cmp.lessThanOrEquals(a.low, b.low)) {
        [l, lc] = [other.low, other.lowClosed];
      } else if (areNumeric(a.low, b.low)) {
        [l, lc] = [highestNumericUncertainty(a.low, b.low), true];
      // TODO: Do we need to support quantities here?
      } else if (areDateTimes(a.low, b.low) && b.low.isMorePrecise(a.low)) {
        [l, lc] = [other.low, other.lowClosed];
      } else {
        [l, lc] = [this.low, this.lowClosed];
      }

      let h, hc;
      if (cmp.lessThanOrEquals(a.high, b.high)) {
        [h, hc] = [this.high, this.highClosed];
      } else if (cmp.greaterThanOrEquals(a.high, b.high)) {
        [h, hc] = [other.high, other.highClosed];
      } else if (areNumeric(a.low, b.low)) {
        [h, hc] = [lowestNumericUncertainty(a.high, b.high), true];
      // TODO: Do we need to support quantities here?
      } else if (areDateTimes(a.high, b.high) && b.high.isMorePrecise(a.high)) {
        [h, hc] = [other.high, other.highClosed];
      } else {
        [h, hc] = [this.high, this.highClosed];
      }

      return new Interval(l, h, lc, hc);
    }
    return null;
  }

  except(other) {
    if (other === null) {
      return null;
    }
    if (!(other instanceof Interval)) {
      throw new Error('Argument to except must be an interval');
    }

    const ol = this.overlaps(other);
    if (ol === true) {
      const olb = this.overlapsBefore(other);
      const ola = this.overlapsAfter(other);
      if (olb === true && ola === false) {
        return new Interval(this.low, other.low, this.lowClosed, !other.lowClosed);
      } else if (ola === true && olb === false) {
        return new Interval(other.high, this.high, !other.highClosed, this.highClosed);
      } else {
        return null;
      }
    } else if (ol === false) {
      return this;
    }
    // ol is null
    return null;
  }

  equals(other) {
    if (other instanceof Interval) {
      const [a, b] = [this.toClosed(), other.toClosed()];
      return ThreeValuedLogic.and(
        cmp.equals(a.low, b.low),
        cmp.equals(a.high, b.high)
      );
    }
    return false;
  }

  after(other, precision) {
    const closed = this.toClosed();
    // Meets spec, but not 100% correct (e.g., (null, 5] after [6, 10] --> null)
    // Simple way to fix it: and w/ not overlaps
    if (other.toClosed) {
      return cmp.greaterThan(closed.low, other.toClosed().high, precision);
    }
    return cmp.greaterThan(closed.low, other, precision);
  }

  before(other, precision) {
    const closed = this.toClosed();
    // Meets spec, but not 100% correct (e.g., (null, 5] after [6, 10] --> null)
    // Simple way to fix it: and w/ not overlaps
    if (other.toClosed) {
      return cmp.lessThan(closed.high, other.toClosed().low, precision);
    }
    return cmp.lessThan(closed.high, other, precision);
  }

  meets(other, precision) {
    return ThreeValuedLogic.or(
      this.meetsBefore(other, precision),
      this.meetsAfter(other, precision)
    );
  }

  meetsAfter(other, precision) {
    try {
      if (precision != null && this.low instanceof DateTime) {
        const high = other.toClosed().high;
        const highPlusOne = high != null ? high.add(1, precision) : high;
        return this.toClosed().low.sameAs(highPlusOne, precision);
      }
      return cmp.equals(this.toClosed().low, successor(other.toClosed().high));
    } catch (error) {
      return false;
    }
  }

  meetsBefore(other, precision) {
    try {
      if (precision != null && this.high instanceof DateTime) {
        const low = other.toClosed().low;
        const lowMinusOne = low != null ? low.add(-1, precision) : low;
        return this.toClosed().high.sameAs(lowMinusOne, precision);
      }
      return cmp.equals(this.toClosed().high, predecessor(other.toClosed().low));
    } catch (error) {
      return false;
    }
  }

  width() {
    if (this.low instanceof DateTime || this.high instanceof DateTime) {
      throw new Error('Width of DateTime intervals is not supported');
    }

    const closed = this.toClosed();
    if (closed.low instanceof Uncertainty || closed.high instanceof Uncertainty) {
      return null;
    }
    // TODO: Fix precision to 8 decimals in other places that return numbers
    const diff = Math.abs(closed.high - closed.low);
    return Math.round(diff * Math.pow(10, 8)) / Math.pow(10, 8);
  }


  toClosed() {
    const point = this.low != null ? this.low : this.high;
    if (typeof point === 'number' || point instanceof DateTime || (point && point.constructor && point.constructor.name === 'Quantity')) {
      let low, high;

      if (this.lowClosed && this.low == null) {
        low = minValueForInstance(point);
      } else if (!this.lowClosed && this.low != null) {
        low = successor(this.low);
      } else {
        low = this.low;
      }

      if (this.highClosed && this.high == null) {
        high = maxValueForInstance(point);
      } else if (!this.highClosed && this.high != null) {
        high = predecessor(this.high);
      } else {
        high = this.high;
      }

      if (low == null) {
        low = new Uncertainty(minValueForInstance(point), high);
      }
      if (high == null) {
        high = new Uncertainty(low, maxValueForInstance(point));
      }

      return new Interval(low, high, true, true);
    } else {
      return new Interval(this.low, this.high, true, true);
    }
  }
}

function areDateTimes(x, y) {
  return [x, y].every(z => z instanceof DateTime);
}

function areNumeric(x, y) {
  return [x, y].every(z => {
    return typeof z === 'number'
      || (z instanceof Uncertainty && typeof z.low === 'number');
  });
}

function lowestNumericUncertainty(x, y) {
  if (!(x instanceof Uncertainty)) { x = new Uncertainty(x); }
  if (!(y instanceof Uncertainty)) { y = new Uncertainty(y); }
  const low = x.low < y.low ? x.low : y.low;
  const high = x.high < y.high ? x.high : y.high;
  if (low !== high) { return new Uncertainty(low, high); } else { return low; }
}

function highestNumericUncertainty(x, y) {
  if (!(x instanceof Uncertainty)) { x = new Uncertainty(x); }
  if (!(y instanceof Uncertainty)) { y = new Uncertainty(y); }
  const low = x.low > y.low ? x.low : y.low;
  const high = x.high > y.high ? x.high : y.high;
  if (low !== high) { return new Uncertainty(low, high); } else { return low; }
}

module.exports = { Interval };