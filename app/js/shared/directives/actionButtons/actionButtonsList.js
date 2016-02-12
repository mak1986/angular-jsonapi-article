(function(){
	'use strict';

	function actionButtonsList(){
		return {
			restrict: 'A',
			scope: {
				resource: '=bindResource',
				controller: '=bindController'
			},
			templateUrl: 'app/js/shared/directives/actionButtons/actionButtonsList.html',
		};
	};

	angular.module('_UiDirectives')
	.directive('actionButtonsList', actionButtonsList);
})();