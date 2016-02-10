(function(){
	'use strict';

	var actionButtonsResource = function(){
		return {
			restrict: 'A',
			scope: {
				controller: '=bindController'
			},
			templateUrl: 'app/js/shared/directives/actionButtons/actionButtonsResource.html',
		};
	};

	angular.module('UiDirectives')
	.directive('actionButtonsResource', actionButtonsResource);
})();