(function() {
	'use strict';

	function Alert($filter, $rootScope) {

		var service = this;
		var queue = [];
		
		$rootScope.$on('$locationChangeSuccess', function() {
			if (queue.length > 0) {
				setAlert(queue.pop());
			} else {
				service.reset();
			}
		});

		this.setSuccessMessage = function(subject, action, redirect) {
			var alert = {};

			alert.active = true;
			alert.type = "success";
			alert.icon = "fa-check";
			alert.title = $filter('hookFilterMachineNameTranslate')('ui.success_title');
			alert.body = $filter('hookFilterReplace')(
				$filter('hookFilterMachineNameTranslate')('ui.success_body'), {
					'$subject': $filter('hookFilterCapitalize')($filter('hookFilterMachineNameTranslate')(subject)),
					'$action': $filter('hookFilterMachineNameTranslate')(action)
			});

			if (redirect == true) {
				queue.push(alert);
			}

			setAlert(alert);
		};

		this.setErrorMessage = function(redirect) {
			var alert = {};

			alert.active = true;
			alert.type = "danger";
			alert.icon = "fa-ban";
			alert.title = $filter('hookFilterMachineNameTranslate')('ui.error_title');
			alert.body = $filter('hookFilterMachineNameTranslate')('ui.error_body');
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
		'$filter',
		'$rootScope'
	];

	angular
		.module('_Alert')
		.service('Alert', Alert);
})();