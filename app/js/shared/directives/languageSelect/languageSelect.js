(function(){
	'use strict';

	function languageSelect(LANGUAGE){
		

		var getEnabledLanguages = function(enabledLanguages){
			var id;
			var result = [];
			console.log(enabledLanguages);
			for(id in enabledLanguages){
				result.push({
					code: enabledLanguages[id],
					name: LANGUAGE[enabledLanguages[id]].name,
					nativeName: LANGUAGE[enabledLanguages[id]].nativeName
				});
			}
			return result;
		};

		return {
			restrict: 'A',
			scope: {
				//enabledLanguages: '=bingEnabledLanguages',
				model: '=bindModel'
			},
			templateUrl: 'app/js/shared/directives/languageSelect/languageSelect.html',
			link: function(scope, element, attrs){
				console.log(scope.model);
				scope.languages = getEnabledLanguages({"1":"en","2":"th"});
			}
		};
	};

	languageSelect.$inject = [
		'LANGUAGE'
	];

	angular.module('_UiDirectives')
	.directive('languageSelect', languageSelect);
})();