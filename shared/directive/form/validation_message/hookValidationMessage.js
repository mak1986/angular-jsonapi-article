(function(){
	'use strict';

	var hookValidationMessage = function(){
		return {
			restrict: 'A',
			scope: {
				form: '=hookValidationMessageBindForm',
				field: '@hookValidationMessageBindField'
			},
			templateUrl: 'shared/directive/form/validation_message/hookValidationMessage.html',
		};
	};

	angular.module('_Directive')
	.directive('hookValidationMessage', hookValidationMessage);
})();