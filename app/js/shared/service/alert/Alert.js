(function() {
	'use strict';

	function Alert($rootScope) {

		var service = this;
		var queue = [];
		
		$rootScope.$on('$locationChangeSuccess', function() {
			if (queue.length > 0) {
				setAlert(queue.pop());
			} else {
				service.reset();
			}
		});

		this.setSuccessMessage = function(message, redirect) {
			var alert = {};

			alert.active = true;
			alert.type = "success";
			alert.icon = "fa-check";
			alert.title = "Success!";
			alert.body = message;
			if (redirect == true) {
				queue.push(alert);
			}
			setAlert(alert);
		};

		this.setErrorMessage = function(message, redirect) {
			var alert = {};

			alert.active = true;
			alert.type = "danger";
			alert.icon = "fa-ban";
			alert.title = "Error!";
			alert.body = message;
			if (redirect == true) {
				queue.push(alert);
			}
			setAlert(alert);
		};

		this.reset = function() {
			this.active = false;
			this.icon = "";
			this.type = "";
			this.title = "";
			this.body = "";
		};

		this.reset();
		
		var setAlert = function(alert) {
			var key;

			for (key in alert) {
				service[key] = alert[key];
			}
		};
	}

	Alert.$inject = [
		'$rootScope'
	];

	angular
		.module('_Alert')
		.service('Alert', Alert);
})();