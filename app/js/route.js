(function() {
	'use strict';
	
	angular.module('HookApp').config(['$routeProvider','CONFIG',
		function($routeProvider, CONFIG) {
			
			for(var key in CONFIG.routes){
				$routeProvider.when(CONFIG.routes[key]['route'], {
					templateUrl: CONFIG.routes[key]['templateUrl']
				});
			}

			$routeProvider.otherwise({
				redirectTo: '/login'
			});
		}
	]);
	
	// solve nv-view inside ng-include. ref: http://stackoverflow.com/questions/16674279/how-to-nest-ng-view-inside-ng-include
	angular.module('HookApp').run(['$route', function($route)  {
  		$route.reload();
	}]);

})();