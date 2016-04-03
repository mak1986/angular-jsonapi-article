(function(){
	'use strict';

	var hookFormButton = function(){
		return {
			restrict: 'A',
			scope: {
				form: '=hookFormButtonBindForm',
				controller: '=hookFormButtonBindController'
			},
			templateUrl: 'shared/directive/form/button/hookFormButton.html',
		};
	};

	angular.module('_Directive')
	.directive('hookFormButton', hookFormButton);
})();