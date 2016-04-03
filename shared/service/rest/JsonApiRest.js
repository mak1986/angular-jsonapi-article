(function() {
	'use strict';

	function JsonApiRest($http) {
			
		var contentType = 'application/vnd.api+json';
		
		this.post = function(url, data) {
			return this.request('POST', url, {'Accept': contentType, 'Content-Type':contentType }, data);
		};
		
		this.get = function(url) {
			return this.request('GET', url, {'Accept': contentType });
		};

		this.patch = function(url, data) {
			return this.request('PATCH', url, {'Accept': contentType, 'Content-Type':contentType }, data);
		};

		this.delete = function(url) {
			return this.request('DELETE', url, {'Accept': contentType });
		};

		this.request = function(method, url, headers, data){
			var request = {};
				request.method = method;
				request.url = url;
				request.headers = headers;
			if(data){
				request.data = data;
			}
			return $http(request);
		};
	}

	JsonApiRest.$inject = [
		'$http'
	];

	angular
		.module('_Rest')
		.service('JsonApiRest', JsonApiRest);
})();