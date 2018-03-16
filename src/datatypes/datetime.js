const { Uncertainty } = require('./uncertainty');
const moment = require('moment');

class DateTime {
  static parse(string) {
    const match = /(\d{4})(-(\d{2}))?(-(\d{2}))?(T((\d{2})(:(\d{2})(:(\d{2})(\.(\d+))?)?)?)?(([+-])(\d{2})(:?(\d{2}))?)?)?/.exec(string);

    if (match && match[0] === string) {
      let args = [match[1], match[3], match[5], match[8], match[10], match[12], match[14]];
      // fix up milliseconds by padding zeros and/or truncating (5 --> 500, 50 --> 500, 54321 --> 543, etc.)
      if (args[6] != null) {
        args[6] = (`${args[6]}00`).substring(0, 3);
      }
      // convert them all to integers
      args = args.map(arg => arg != null ? parseInt(arg, 10) : arg);
      // convert timezone offset to decimal and add it to arguments
      if (match[17] != null) {
        let num = parseInt(match[17], 10);
        if (match[19] != null) {
          num += parseInt(match[19], 10) / 60;
        }
        args.push(match[16] === '+' ? num : num * -1);
      }
      return new DateTime(...args);
    } else {
      return null;
    }
  }

  static fromDate(date, timezoneOffset) {
    if (timezoneOffset != null) {
      date = new Date(date.getTime() + (timezoneOffset * 60 * 60 * 1000));
      return new DateTime(
        date.getUTCFullYear(),
        date.getUTCMonth() + 1,
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds(),
        timezoneOffset);
    } else {
      return new DateTime(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds());
    }
  }

  constructor(year=null, month=null, day=null, hour=null, minute=null, second=null, millisecond=null, timezoneOffset=null) {
    // from the spec: If no timezone is specified, the timezone of the evaluation request timestamp is used.
    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = hour;
    this.minute = minute;
    this.second = second;
    this.millisecond = millisecond;
    this.timezoneOffset = timezoneOffset;
    if ((this.timezoneOffset == null)) {
      this.timezoneOffset = ((new Date()).getTimezoneOffset() / 60) * -1;
    }
  }

  copy() {
    return new DateTime(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond, this.timezoneOffset);
  }

  successor() {
    if (this.millisecond != null) {
      return this.add(1,DateTime.Unit.MILLISECOND);
    } else if (this.second != null) {
      return this.add(1,DateTime.Unit.SECOND);
    } else if (this.minute != null) {
      return this.add(1,DateTime.Unit.MINUTE);
    } else if (this.hour != null) {
      return this.add(1,DateTime.Unit.HOUR);
    } else if (this.day != null) {
      return this.add(1,DateTime.Unit.DAY);
    } else if (this.month != null) {
      return this.add(1,DateTime.Unit.MONTH);
    } else if (this.year != null) {
      return this.add(1,DateTime.Unit.YEAR);
    }
  }

  predecessor() {
    if (this.millisecond != null) {
      return this.add(-1,DateTime.Unit.MILLISECOND);
    } else if (this.second != null) {
      return this.add(-1,DateTime.Unit.SECOND);
    } else if (this.minute != null) {
      return this.add(-1,DateTime.Unit.MINUTE);
    } else if (this.hour != null) {
      return this.add(-1,DateTime.Unit.HOUR);
    } else if (this.day != null) {
      return this.add(-1,DateTime.Unit.DAY);
    } else if (this.month != null) {
      return this.add(-1,DateTime.Unit.MONTH);
    } else if (this.year != null) {
      return this.add(-1,DateTime.Unit.YEAR);
    }
  }

  convertToTimezoneOffset(timezoneOffset = 0) {
    const d = DateTime.fromDate(this.toJSDate(), timezoneOffset);
    return d.reducedPrecision(this.getPrecision());
  }

  sameAs(other, precision = DateTime.Unit.MILLISECOND) {
    if (!(other instanceof DateTime)) return null;

    const diff = this.differenceBetween(other, precision);
    if (diff.low == 0 && diff.high == 0) return true;
    if (diff.low <= 0 && diff.high >= 0) return null;
    return false;
  }

  equals(other) {
    return this.sameAs(other, DateTime.Unit.MILLISECOND);
  }

  sameOrBefore(other, precision = DateTime.Unit.MILLISECOND) {
    if (!(other instanceof DateTime)) return false;

    const diff = this.differenceBetween(other, precision);
    if (diff.low >= 0 && diff.high >= 0) return true;
    if (diff.low < 0 && diff.high < 0) return false;
    return null;
  }

  sameOrAfter(other, precision = DateTime.Unit.MILLISECOND) {
    if (!(other instanceof DateTime)) return false;

    const diff = this.differenceBetween(other, precision);
    if (diff.low <= 0 && diff.high <= 0) return true;
    if (diff.low > 0 && diff.high > 0) return false;
    return null;
  }

  before(other, precision = DateTime.Unit.MILLISECOND) {
    if (!(other instanceof DateTime)) return false;

    const diff = this.differenceBetween(other, precision);
    if (diff.low > 0 && diff.high > 0) return true;
    if (diff.low <= 0 && diff.high <= 0) return false;
    return null;
  }

  after(other, precision = DateTime.Unit.MILLISECOND) {
    if (!(other instanceof DateTime)) return false;

    const diff = this.differenceBetween(other, precision);
    if (diff.low < 0 && diff.high < 0) return true;
    if (diff.low >= 0 && diff.high >= 0) return false;
    return null;
  }

  add(offset, field) {
    // TODO: According to spec, 2/29/2000 + 1 year is 2/28/2001
    // Currently, it evaluates to 3/1/2001.  Doh.
    const result = this.copy();

    // If weeks, convert to days
    if (field === DateTime.Unit.WEEK) {
      offset = offset * 7;
      field = DateTime.Unit.DAY;
    }

    if (result[field] != null) {
      // Increment the field, then round-trip to JS date and back for calendar math
      result[field] = result[field] + offset;
      const normalized = DateTime.fromDate(result.toJSDate(), this.timezoneOffset);
      for (field of DateTime.FIELDS) {
        if (result[field] != null) {
          result[field] = normalized[field];
        }
      }
    }

    return result;
  }

  differenceBetween(other, unitField) {
    if (!(other instanceof DateTime)) { return null; }

    // According to CQL spec, to calculate difference, you can just floor lesser precisions and do a duration
    // Make copies since we'll be flooring values and mucking with timezones
    let a = this.copy();
    let b = other.copy();
    // Use moment.js for day or finer granularity due to the daylight savings time fall back/spring forward
    if ((unitField === DateTime.Unit.MONTH) || (unitField === DateTime.Unit.YEAR)) {
      // The dates need to agree on where the boundaries are, so we must normalize to the same time zone
      if (a.timezoneOffset !== b.timezoneOffset) {
        b = b.convertToTimezoneOffset(a.timezoneOffset);
      }

      // JS always represents dates in the current locale, but in locales with DST, we want to account for the
      // potential difference in offset from one date to the other.  We try to simulate them being in the same
      // timezone, because we don't want midnight to roll back to 11:00pm since that will mess up day boundaries.
      const aJS = a.toJSDate(true);
      const bJS = b.toJSDate(true);
      // Set tzDiff to zero if a and b are both UTC (UTC is not subject to DST)
      const tzDiff = a.isUTC() && b.isUTC() ? 0 : aJS.getTimezoneOffset() - bJS.getTimezoneOffset();
      if (tzDiff !== 0) {
        // Since we'll be doing duration later, account for timezone offset by adding to the time (if possible)
        if (b.year != null && b.month != null && b.day != null && b.hour != null && b.minute != null) {
          b = b.add(tzDiff, DateTime.Unit.MINUTE);
        } else if (b.year != null && b.month != null && b.day != null && b.hour != null) {
          b = b.add(tzDiff/60, DateTime.Unit.HOUR);
        } else {
          b.timezoneOffset = b.timezoneOffset + (tzDiff/60);
        }
      }
    }

    // Now floor lesser precisions before we go on to calculate duration
    if (unitField === DateTime.Unit.YEAR) {
      a = new DateTime(a.year, 1, 1, 12, 0, 0, 0, a.timezoneOffset);
      b = new DateTime(b.year, 1, 1, 12, 0, 0, 0, b.timezoneOffset);
    } else if (unitField === DateTime.Unit.MONTH) {
      a = new DateTime(a.year, a.month, 1, 12, 0, 0, 0, a.timezoneOffset);
      b = new DateTime(b.year, b.month, 1, 12, 0, 0, 0, b.timezoneOffset);
    } else if (unitField === DateTime.Unit.WEEK) {
      a = this._floorWeek(a);
      b = this._floorWeek(b);
    } else if (unitField === DateTime.Unit.DAY) {
      a = new DateTime(a.year, a.month, a.day, 12, 0, 0, 0, a.timezoneOffset);
      b = new DateTime(b.year, b.month, b.day, 12, 0, 0, 0, b.timezoneOffset);
    } else if (unitField === DateTime.Unit.HOUR) {
      a = new DateTime(a.year, a.month, a.day, a.hour, 30, 0, 0, a.timezoneOffset);
      b = new DateTime(b.year, b.month, b.day, b.hour, 30, 0, 0, b.timezoneOffset);
    } else if (unitField === DateTime.Unit.MINUTE) {
      a = new DateTime(a.year, a.month, a.day, a.hour, a.minute, 0, 0, a.timezoneOffset);
      b = new DateTime(b.year, b.month, b.day, b.hour, b.minute, 0, 0, b.timezoneOffset);
    } else if (unitField === DateTime.Unit.SECOND) {
      a = new DateTime(a.year, a.month, a.day, a.hour, a.minute, a.second, 0, a.timezoneOffset);
      b = new DateTime(b.year, b.month, b.day, b.hour, b.minute, b.second, 0, b.timezoneOffset);
    }

    // Because moment.js handles years and months differently, use the existing durationBetween for those
    // Finer granularity times can be handled by the DST-aware moment.js library.
    if ((unitField === DateTime.Unit.YEAR) || (unitField === DateTime.Unit.MONTH)) {
      return a.durationBetween(b, unitField);
    } else {
      const aUncertainty = a.toUncertainty();
      const bUncertainty = b.toUncertainty();
      const aLowMoment = moment(aUncertainty.low).utc();
      const aHighMoment = moment(aUncertainty.high).utc();
      const bLowMoment = moment(bUncertainty.low).utc();
      const bHighMoment = moment(bUncertainty.high).utc();
      // moment uses the plural form of the unitField
      return new Uncertainty(bLowMoment.diff(aHighMoment, unitField + 's'), bHighMoment.diff(aLowMoment, unitField + 's'));
    }
  }

  _floorWeek(d) {
    // To "floor" a week, we need to go back to the last Sunday (that's when getDay() == 0 in javascript)
    // But if we don't know the day, then just return it as-is
    if (d.day == null) {
      return d;
    }
    const floored = new Date(d.year, d.month-1, d.day);
    while (floored.getDay() > 0) {
      floored.setDate(floored.getDate() - 1);
    }
    return new DateTime(floored.getFullYear(), floored.getMonth()+1, floored.getDate(), 12, 0, 0, 0, d.timezoneOffset);
  }

  durationBetween(other, unitField) {
    if (!(other instanceof DateTime)) return null;

    const a = this.toUncertainty();
    const b = other.toUncertainty();
    return new Uncertainty(this._durationBetweenDates(a.high, b.low, unitField), this._durationBetweenDates(a.low, b.high, unitField));
  }

  // NOTE: a and b are real JS dates -- not DateTimes
  _durationBetweenDates(a, b, unitField) {
    // DurationBetween is different than DifferenceBetween in that DurationBetween counts whole elapsed time periods, but
    // DifferenceBetween counts boundaries.  For example:
    // difference in days between @2012-01-01T23:59:59.999 and @2012-01-02T00:00:00.0 calculates to 1 (since it crosses day boundary)
    // days between @2012-01-01T23:59:59.999 and @2012-01-02T00:00:00.0 calculates to 0 (since there are no full days between them)
    const msDiff = b.getTime() - a.getTime();

    if (msDiff === 0) {
      return 0;
    }
    // If it's a negative delta, we need to use ceiling instead of floor when truncating
    const truncFunc = msDiff > 0 ? Math.floor : Math.ceil;
    // For ms, s, min, hr, day, and week this is trivial
    if (unitField === DateTime.Unit.MILLISECOND) {
      return msDiff;
    } else if (unitField === DateTime.Unit.SECOND) {
      return truncFunc(msDiff / 1000);
    } else if (unitField === DateTime.Unit.MINUTE) {
      return truncFunc(msDiff / (60 * 1000));
    } else if (unitField === DateTime.Unit.HOUR) {
      return truncFunc(msDiff / (60 * 60 * 1000));
    } else if (unitField === DateTime.Unit.DAY) {
      return truncFunc(msDiff / (24 * 60 * 60 * 1000));
    } else if (unitField === DateTime.Unit.WEEK) {
      return truncFunc(msDiff / (7 * 24 * 60 * 60 * 1000));
    // Months and years are trickier since months are variable length
    } else if ((unitField === DateTime.Unit.MONTH) || (unitField === DateTime.Unit.YEAR)) {
      // First get the rough months, essentially counting month "boundaries"
      let months = ((b.getFullYear() - a.getFullYear()) * 12) + (b.getMonth() - a.getMonth());
      // Now we need to look at the smaller units to see how they compare.  Since we only care about comparing
      // days and below at this point, it's much easier to bring a up to b so it's in the same month, then
      // we can compare on just the remaining units.
      const aInMonth = new Date(a.getTime());
      // Remember the original timezone offset because if it changes when we bring it up a month, we need to fix it
      const aInMonthOriginalOffset = aInMonth.getTimezoneOffset();
      aInMonth.setMonth(a.getMonth() + months);
      if (aInMonthOriginalOffset !== aInMonth.getTimezoneOffset()) {
        aInMonth.setMinutes(aInMonth.getMinutes() + (aInMonthOriginalOffset - aInMonth.getTimezoneOffset()));
      }
      // When a is before b, then if a's smaller units are greater than b's, a whole month hasn't elapsed, so adjust
      if (msDiff > 0 && aInMonth > b) {
        months = months - 1;
      // When b is before a, then if a's smaller units are less than b's, a whole month hasn't elaspsed backwards, so adjust
      } else if ((msDiff < 0) && (aInMonth < b)) {
        months = months + 1;
      }
      // If this is months, just return them, but if it's years, we need to convert
      if (unitField === DateTime.Unit.MONTH) {
        return months;
      } else {
        return truncFunc(months/12);
      }
    } else {
      return null;
    }
  }


  isPrecise() {
    return DateTime.FIELDS.every(field => this[field] != null);
  }

  isImprecise() {
    return !this.isPrecise();
  }

  isMorePrecise(other) {
    for (let field of DateTime.FIELDS) {
      if (other[field] != null && this[field] == null) {
        return false;
      }
    }
    return !this.isSamePrecision(other);
  }

  isLessPrecise(other) {
    return !this.isSamePrecision(other) && !this.isMorePrecise(other);
  }

  isSamePrecision(other) {
    for (let field of DateTime.FIELDS) {
      if ((this[field] != null && other[field] == null) || (this[field] == null && other[field] != null)) {
        return false;
      }
    }
    return true;
  }

  isUTC() {
    // A timezoneOffset of 0 indicates UTC time.
    return !this.timezoneOffset;
  }

  getPrecision() {
    let result = null;
    if (this.year != null) { result = DateTime.Unit.YEAR; } else { return result; }
    if (this.month != null) { result = DateTime.Unit.MONTH; } else { return result; }
    if (this.day != null) { result = DateTime.Unit.DAY; } else { return result; }
    if (this.hour != null) { result = DateTime.Unit.HOUR; } else { return result; }
    if (this.minute != null) { result = DateTime.Unit.MINUTE; } else { return result; }
    if (this.second != null) { result = DateTime.Unit.SECOND; } else { return result; }
    if (this.millisecond != null) { result = DateTime.Unit.MILLISECOND; }
    return result;
  }

  toUncertainty(ignoreTimezone = false) {
    const low = this.toJSDate(ignoreTimezone);
    const high = (new DateTime(
      this.year,
      this.month != null ? this.month : 12,
      // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate
      this.day != null ? this.day : (new Date(this.year, this.month != null ? this.month : 12, 0)).getDate(),
      this.hour != null ? this.hour : 23,
      this.minute != null ? this.minute : 59,
      this.second != null ? this.second : 59,
      this.millisecond != null ? this.millisecond : 999,
      this.timezoneOffset)).toJSDate(ignoreTimezone);
    return new Uncertainty(low, high);
  }

  toJSDate(ignoreTimezone = false) {
    const y = this.year;
    const mo = this.month != null ? this.month-1 : 0;
    const d = this.day != null ? this.day : 1;
    const h = this.hour != null ? this.hour : 0;
    const mi = this.minute != null ? this.minute : 0;
    const s = this.second != null ? this.second : 0;
    const ms = this.millisecond != null ? this.millisecond : 0;

    if ((this.timezoneOffset != null) && !ignoreTimezone) {
      return new Date(Date.UTC(y, mo, d, h, mi, s, ms) - (this.timezoneOffset * 60 * 60 * 1000));
    } else {
      return new Date(y, mo, d, h, mi, s, ms);
    }
  }

  toJSON() {
    return this.toString();
  }

  _pad(num) {
    return String(`0${num}`).slice(-2);
  }

  // TODO: Needs unit tests!
  toString() {
    let str = '';
    if (this.year != null) {
      str += this.year;
      if (this.month != null) {
        str += `-${this._pad(this.month)}`;
        if (this.day != null) {
          str += `-${this._pad(this.day)}`;
          if (this.hour != null) {
            str += `T${this._pad(this.hour)}`;
            if (this.minute != null) {
              str += `:${this._pad(this.minute)}`;
              if (this.second != null) {
                str += `:${this._pad(this.second)}`;
                if (this.millisecond != null) {
                  str += `.${this._pad(this.millisecond)}`;
                }
              }
            }
          }
        }
      }
    }

    if ((str.indexOf('T') !== -1) && (this.timezoneOffset != null)) {
      str += this.timezoneOffset < 0 ? '-' : '+';
      const offsetHours = Math.floor(Math.abs(this.timezoneOffset));
      str += this._pad(offsetHours);
      const offsetMin = (Math.abs(this.timezoneOffset) - offsetHours) * 60;
      str += this._pad(offsetMin);
    }

    return str;
  }

  getDate() {
    return this.reducedPrecision(DateTime.Unit.DAY);
  }

  getTime() {
    return new DateTime(0, 1, 1, this.hour, this.minute, this.second, this.millisecond, this.timezoneOffset);
  }

  isTime() {
    return this.year === 0 && this.month === 1 && this.day === 1;
  }

  reducedPrecision(unitField = DateTime.Unit.MILLISECOND) {
    const reduced = this.copy();
    if (unitField !== DateTime.Unit.MILLISECOND) {
      const fieldIndex = DateTime.FIELDS.indexOf(unitField);
      const fieldsToRemove = DateTime.FIELDS.slice(fieldIndex + 1);
      for (let field of fieldsToRemove) {
        reduced[field] = null;
      }
    }
    return reduced;
  }
}

DateTime.Unit = { YEAR: 'year', MONTH: 'month', WEEK: 'week', DAY: 'day', HOUR: 'hour', MINUTE: 'minute', SECOND: 'second', MILLISECOND: 'millisecond' };
DateTime.FIELDS = [DateTime.Unit.YEAR, DateTime.Unit.MONTH, DateTime.Unit.DAY, DateTime.Unit.HOUR, DateTime.Unit.MINUTE, DateTime.Unit.SECOND, DateTime.Unit.MILLISECOND];

module.exports = { DateTime };