(function() {
  'use strict';
 	var relationship = function(CONFIG) {

 		var getAliasByModelType = function(modelType, relationshipModelType) {
			var alias;
			var relationshipAliases = CONFIG.models[modelType].relationships;

			for (alias in relationshipAliases) {
				if (relationshipAliases[alias].type == relationshipModelType) {
					return alias;
				}
			}

			return null;
		};
		// not working yet.
		return function(input, relationshipModelType, modelType, id) {
			console.log(relationshipModelType, modelType, id);
			console.log(input);
			var result = {};
			var relationshipAlias = getAliasByModelType(modelType, relationshipModelType)
			
			for(var i in input){
				console.log(input[i][relationshipAlias].id, id);
				if (input[i][relationshipAlias].id == id){
					result[i] = input[i];
				}
			}
			return result;
    	}
	};
	relationship.$inject = [
		'CONFIG'
	];
	angular.module('Filters')
	.filter('relationship', relationship);

})();