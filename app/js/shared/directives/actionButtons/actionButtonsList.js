(function(){
	'use strict';

	var actionButtonsList = function(){
		return {
			restrict: 'A',
			scope: {
				resource: '=bindResource',
				controller: '=bindController'
			},
			templateUrl: 'app/js/shared/directives/actionButtons/actionButtonsList.html',
		};
	};

	angular.module('UiDirectives')
	.directive('actionButtonsList', actionButtonsList);
})();