(function(){
	'use strict';

	function ArticlesCtrl($scope, ResourceManager){
		
		ResourceManager.get('article').then(function(data){
		 	$scope.articles = data;
		}, function (errorData) {
		 	console.log(errorData);
		});
	
	}

	ArticlesCtrl.$inject = [
		'$scope',
		'ResourceManager'
	];

	angular
		.module('ArticlesApp')
		.controller('ArticlesCtrl', ArticlesCtrl);
})();