(function() {
	'use strict';
	
	angular.module('VisitorApp').config(['$routeProvider','$locationProvider','CONFIG',
		function($routeProvider, $locationProvider ,CONFIG) {
			
			// for(var key in CONFIG.routes){
			// 	$routeProvider.when(CONFIG.routes[key]['route'], {
			// 		templateUrl: CONFIG.routes[key]['templateUrl']
			// 	});
			// }
			$routeProvider.when('/:language/invoice', {
				templateUrl: '/visitor_app/template/invoice.html'
			});
			$routeProvider.when('/:language/payment', {
				templateUrl: '/visitor_app/template/payment.html'
			});
			$routeProvider.when('/:language/receipt', {
				templateUrl: '/visitor_app/template/receipt.html'
			});
			$routeProvider.when('/:language/accommodations', {
				templateUrl: '/visitor_app/template/accommodations.html'
			});
			$routeProvider.when('/:language/accommodation/:id', {
				templateUrl: '/visitor_app/template/accommodation.html'
			});

			$routeProvider.when('/:language/:page', {
				templateUrl: '/visitor_app/template/page.html'
			});

			$routeProvider.otherwise({
				redirectTo: '/' + CONFIG.site.default_language + '/home',
				templateUrl: '/visitor_app/template/page.html'
			});

			// $locationProvider.html5Mode({
			//   enabled: true,
			//   requireBase: false
			// });
		}
	]);
	
	// solve nv-view inside ng-include. ref: http://stackoverflow.com/questions/16674279/how-to-nest-ng-view-inside-ng-include
	angular.module('VisitorApp').run(['$route', function($route)  {
  		$route.reload();
	}]);

})();