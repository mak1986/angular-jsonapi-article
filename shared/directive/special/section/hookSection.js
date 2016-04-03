(function(){
	'use strict';

	function hookSection(){
		
		return {
			restrict: 'A',
			scope: {	
				section: '=hookSectionBindModel',
				language: '&hookSectionBindLanguage',
				template: '&hookSectionBindTemplate'
			},
			template: '<section ng-include="template()"></section>'
		};
	};

	angular.module('_Directive')
	.directive('hookSection', hookSection);
})();