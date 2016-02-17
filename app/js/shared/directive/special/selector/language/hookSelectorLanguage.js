(function(){
	'use strict';

	function hookSelectorLanguage(CONFIG){
		

		var getEnabledLanguages = function(enabledLanguages){
			var id;
			var result = [];
			console.log(enabledLanguages);
			for(id in enabledLanguages){
				result.push({
					code: enabledLanguages[id],
					name: CONFIG.languages[enabledLanguages[id]].name,
					nativeName: CONFIG.languages[enabledLanguages[id]].nativeName
				});
			}
			return result;
		};

		return {
			restrict: 'A',
			scope: {
				//enabledLanguages: '=bingEnabledLanguages',
				model: '=hookSelectorLanguageBindModel'
			},
			templateUrl: 'app/js/shared/directive/special/selector/language/hookSelectorLanguage.html',
			link: function(scope, element, attrs){
				console.log(scope.model);
				scope.languages = getEnabledLanguages({"1":"en","2":"th"});
			}
		};
	};

	hookSelectorLanguage.$inject = [
		'CONFIG'
	];

	angular.module('_Directive')
	.directive('hookSelectorLanguage', hookSelectorLanguage);
})();