(function(){
	'use strict';

	var hookFormLabel = function(){
		return {
			restrict: 'A',
			scope: {
				form: '=hookFormLabelBindForm',
				field: '@hookFormLabelBindField',
				flag: '=hookFormLabelBindFlag',
				required: '@hookFormLabelBindRequired'
			},
			templateUrl: 'shared/directive/form/label/hookFormLabel.html',
		};
	};

	angular.module('_Directive')
	.directive('hookFormLabel', hookFormLabel);
})();