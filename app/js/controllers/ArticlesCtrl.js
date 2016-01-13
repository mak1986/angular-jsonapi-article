(function(){
	'use strict';

	function ArticlesCtrl($scope, Resource){
		
		Resource.get('http://localhost:3000/api/article?include=comments').then(function(data){
			$scope.articles = data;
		}, function (errorData) {
			console.log(errorData);
		});
	
	}

	ArticlesCtrl.$inject = [
		'$scope',
		'Resource'
	];

	angular
		.module('ArticlesApp')
		.controller('ArticlesCtrl', ArticlesCtrl);
})();