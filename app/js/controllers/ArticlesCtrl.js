(function(){
	'use strict';

	function ArticlesCtrl($scope, ResourceManager){
		
		// ResourceManager.get('article').then(function(data){
		//  	$scope.articles = data;
		// }, function (errorData) {
		//  	console.log(errorData);
		// });
		$scope.articles = ResourceManager.converter.hallo();
		console.log(ResourceManager);
	}

	ArticlesCtrl.$inject = [
		'$scope',
		'ResourceManager'
	];

	angular
		.module('ArticlesApp')
		.controller('ArticlesCtrl', ArticlesCtrl);
})();