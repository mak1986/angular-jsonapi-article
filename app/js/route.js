
(function(){

angular.module('ArticlesApp').config(['$routeProvider',
	function($routeProvider){
		//console.log('in config');
		$routeProvider.
			when('/articles', {
				templateUrl: 'components/article/views/index.html',
				controller: 'ArticleCtrl',
				controllerAs: 'ArticleCtrl'
			}).
			when('/articles/create', {
				templateUrl: 'components/article/views/create.html',
				controller: 'ArticleCtrl',
				controllerAs: 'ArticleCtrl'
			}).
			when('/articles/edit/:articleId', {
				templateUrl: 'components/article/views/edit.html',
				controller: 'ArticleCtrl',
				controllerAs: 'ArticleCtrl'
			}).
			when('/articles/:articleId', {
				templateUrl: 'components/article/views/show.html',
				controller: 'ArticleCtrl',
				controllerAs: 'ArticleCtrl'
			}).

			otherwise({
				redirectTo: '/articles'
			});
	}]);

})();