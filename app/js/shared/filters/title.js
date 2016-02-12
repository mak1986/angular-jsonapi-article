(function() {
  'use strict';
 	var title = function($filter) {
		return function(input) {
			var words = input.split(" ");
			var word;
			var result = [];
			
			for(word in words){
				result.push($filter('capitalize')(word));
			}
			
			return result.join(" ");
    	}
	};

	title.$inject = [
		'$filter'
	];

	angular.module('_Filters')
	.filter('title', title);

})();