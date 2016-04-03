(function() {
  'use strict';
  var orderObjectBy = function($filter) {

    var filterName = "orderObjectBy";

    return function(items, field, reverse) {

      if ($filter('hookFilterInBlackListFilters')(filterName)) {
        return input;
      }

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

  orderObjectBy.$inject = [
    '$filter'
  ];

  angular
    .module('_Filter')
    .filter('orderObjectBy', orderObjectBy);
})();