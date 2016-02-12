(function(){
	'use strict';

	function actionButtonsResource(){
		return {
			restrict: 'A',
			scope: {
				controller: '=bindController'
			},
			templateUrl: 'app/js/shared/directives/actionButtons/actionButtonsResource.html',
		};
	};

	angular.module('_UiDirectives')
	.directive('actionButtonsResource', actionButtonsResource);
})();