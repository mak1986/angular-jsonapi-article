(function() {
  'use strict';
  var orderObjectBy = function() {

    return function(items, field, reverse) {

      var filtered = [];

      angular.forEach(items, function(item) {
        filtered.push(item);
      });

      filtered.sort(function(a, b) {
        return (a[field] > b[field] ? 1 : -1);
      });

      if (reverse) filtered.reverse();

      return filtered;

    };

  }
  angular
    .module('_Filters')
    .filter('orderObjectBy', orderObjectBy);
})();