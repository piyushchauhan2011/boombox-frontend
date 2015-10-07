var _ = require('lodash');

function Unique() {
  return function (arr, field) {
      return _.uniq(arr, function(a) { return a[field]; });
  };  
}

module.exports = Unique;