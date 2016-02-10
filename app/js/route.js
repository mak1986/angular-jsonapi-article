(function() {
	'use strict';
	
	angular.module('ArticlesApp').config(['$routeProvider',
		function($routeProvider) {
			//console.log('in config');
			$routeProvider.
			when('/login',{
				
			}).
			when('/group/list', {
				templateUrl: 'app/resources/group/views/list.html',
				//controller: 'GroupController',
				//controllerAs: 'GroupController'
			}).
			when('/group/show/:id', {
				templateUrl: 'app/resources/group/views/show.html',
				//controller: 'GroupController',
				//controllerAs: 'GroupController'
			}).
			when('/group/:mode', {
				templateUrl: 'app/resources/group/views/form.html',
				//controller: 'GroupController',
				//controllerAs: 'GroupController'
			}).
			when('/group/:mode/:id', {
				templateUrl: 'app/resources/group/views/form.html',
				//controller: 'GroupController',
				//controllerAs: 'GroupController'
			}).
			when('/user/list', {
				templateUrl: 'app/resources/user/views/list.html',
				//controller: 'UserController',
				//controllerAs: 'UserController'
			}).
			when('/user/show/:id', {
				templateUrl: 'app/resources/user/views/show.html',
				//controller: 'UserController',
				//controllerAs: 'UserController'
			}).
			when('/user/:mode', {
				templateUrl: 'app/resources/user/views/form.html',
				//controller: 'UserController',
				//controllerAs: 'UserController'
			}).
			when('/user/:mode/:id', {
				templateUrl: 'app/resources/user/views/form.html',
				//controller: 'UserController',
				//controllerAs: 'UserController'
			}).
			when('/user-preference/list', {
				templateUrl: 'app/resources/user_preference/views/list.html',
				//controller: 'GroupController',
				//controllerAs: 'GroupController'
			}).
			when('/user-preference/show/:id', {
				templateUrl: 'app/resources/user_preference/views/show.html',
				//controller: 'GroupController',
				//controllerAs: 'GroupController'
			}).
			when('/user-preference/:mode', {
				templateUrl: 'app/resources/user_preference/views/form.html',
				//controller: 'GroupController',
				//controllerAs: 'GroupController'
			}).
			when('/user-preference/:mode/:id', {
				templateUrl: 'app/resources/user_preference/views/form.html',
				//controller: 'GroupController',
				//controllerAs: 'GroupController'
			}).
			otherwise({
				redirectTo: '/login'
			});
		}
	]);
	
	// solve nv-view inside ng-include. ref: http://stackoverflow.com/questions/16674279/how-to-nest-ng-view-inside-ng-include
	angular.module('ArticlesApp').run(['$route', function($route)  {
  		$route.reload();
	}]);

})();