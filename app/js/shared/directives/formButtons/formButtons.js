(function(){
	'use strict';

	var formButtons = function(){
		return {
			restrict: 'A',
			scope: {
				controller: '=bindController'
			},
			templateUrl: 'app/js/shared/directives/formButtons/formButtons.html',
		};
	};

	angular.module('_UiDirectives')
	.directive('formButtons', formButtons);
})();