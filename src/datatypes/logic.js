class ThreeValuedLogic {
  static and(...val) {
    if (val.includes(false)) {
      return false;
    } else if (val.includes(null)) {
      return null;
    }
    return true;
  }

  static or(...val) {
    if (val.includes(true)) {
      return true;
    } else if (val.includes(null)) {
      return null;
    }
    return false;
  }

  static xor(...val) {
    if (val.includes(null)) {
      return null;
    }
    return val.reduce((a, b) => (!a ^ !b) === 1);
  }

  static not(val) {
    if (val != null) {
      return !val;
    }
    return null;
  }
}

module.exports = { ThreeValuedLogic };
