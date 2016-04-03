(function(){
	'use strict';

	function hookActionButtonBoxTools(){
		return {
			restrict: 'A',
			scope: {
				controller: '=hookActionButtonBoxToolsBindController'
			},
			templateUrl: 'shared/directive/special/action_button/box_tools/hookActionButtonBoxTools.html',
		};
	};

	angular.module('_Directive')
	.directive('hookActionButtonBoxTools', hookActionButtonBoxTools);
})();