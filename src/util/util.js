/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let typeIsArray;
module.exports.compact = things=> things.filter(x=> x != null);

module.exports.numerical_sort = (things, direction="asc") =>
  things.sort(function(a,b){
    if (direction === "asc") {
      return a - b;
    } else {
      return b - a;
    }
  })
;

module.exports.isNull = value => value===null;
  
module.exports.typeIsArray  = (typeIsArray  = Array.isArray || ( value  => ({}.toString.call( value ) === '[object Array]')));

module.exports.allTrue = function(things) {
  if (typeIsArray(things)) {
    return things.every(x => x);
  } else {
    return things;
  }
};

module.exports.anyTrue = function(things) {
  if (typeIsArray(things)) {
    return things.some(x => x);
  } else {
    return things;
  }
};
