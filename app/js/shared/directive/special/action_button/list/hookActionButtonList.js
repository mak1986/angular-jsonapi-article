(function(){
	'use strict';

	function hookActionButtonList(){
		return {
			restrict: 'A',
			scope: {
				resource: '=hookActionButtonListBindResource',
				controller: '=hookActionButtonListBindController'
			},
			templateUrl: 'app/js/shared/directive/special/action_button/list/hookActionButtonList.html',
		};
	};

	angular.module('_Directive')
	.directive('hookActionButtonList', hookActionButtonList);
})();