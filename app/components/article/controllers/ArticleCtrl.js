(function() {
	'use strict';

	function ArticleCtrl($routeParams, ResourceManager) {
		//vm = $scope;
		var vm = this;
		vm.articles = {};
		vm.article = {};

		vm.index = function() {
			console.log(ResourceManager);
			ResourceManager.read('article').then(function(data) {
				vm.articles = data;
			}, function(errorData) {
				console.log(errorData);
			});
		};
		vm.show = function() {
			ResourceManager.readById('article', $routeParams.articleId).then(function(data) {
				vm.article = data;
			}, function(errorData) {
				console.log(errorData);
			});
		};

		vm.create = function() {

		};

		vm.edit = function() {
			ResourceManager.readById('article', $routeParams.articleId).then(function(data) {
				vm.article = ResourceManager.shallowCopy(data);
			}, function(errorData) {
				console.log(errorData);
			});
		};

		vm.store = function(article) {
			article.type = 'article';
			ResourceManager.create(article)
				.then(function() {
					$location.path('/articles');
				}, function() {
					$location.path('/articles');
				});
		};

		vm.update = function(article) {
			ResourceManager.update(article)
				.then(function() {
					$location.path('/articles');
				}, function() {
					$location.path('/articles');
				});
		};

		vm.destroy = function(article) {
			ResourceManager.delete(article)
				.then(function() {
					$location.path('/articles');
				}, function() {
					$location.path('/articles');
				});
		};
	}

	ArticleCtrl.$inject = [
		'$routeParams',
		'ResourceManager'
	];

	angular
		.module('Controllers')
		.controller('ArticleCtrl', ArticleCtrl);
})();