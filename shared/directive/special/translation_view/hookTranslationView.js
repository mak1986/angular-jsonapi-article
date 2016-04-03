(function(){
	'use strict';

	function hookTranslationView(CONFIG){
		
		var relationshipsHasKey = function(type, key){
			var relationshipAlias;

			for(relationshipAlias in CONFIG.models[type].relationships){
				if(relationshipAlias == key){
					return true;
				}
			}

			return false;
		
		};

		var getTranslationFields = function(model){
			var translationFieldsModel = {};
			var relationshipAlias;
			var key;

			for(key in model){

				if(!relationshipsHasKey(model.type, key) && typeof model[key] == 'object'){
					translationFieldsModel[key] = model[key];
				}
			}

			return translationFieldsModel;
		};

		return {
			restrict: 'A',
			scope: {	
				model: '=hookTranslationViewBindModel',
				getLanguage: '&hookTranslationViewBindGetLanguage',
				getEnabledLanguages: '&hookTranslationViewBindGetEnabledLanguages'
			},
			templateUrl: 'shared/directive/special/translation_view/hookTranslationView.html',
			link: function(scope, element, attrs, ctrl){
				scope.translationFieldsModel = getTranslationFields(scope.model);
			}
		};
	};

	hookTranslationView.$inject = [
		'CONFIG'
	];

	angular.module('_Directive')
	.directive('hookTranslationView', hookTranslationView);
})();