(function(){
	'use strict';

	function hookActionButtonList(){
		return {
			restrict: 'A',
			scope: {
				resource: '=hookActionButtonListBindResource',
				controller: '=hookActionButtonListBindController'
			},
			templateUrl: 'shared/directive/special/action_button/list/hookActionButtonList.html',
		};
	};

	angular.module('_Directive')
	.directive('hookActionButtonList', hookActionButtonList);
})();