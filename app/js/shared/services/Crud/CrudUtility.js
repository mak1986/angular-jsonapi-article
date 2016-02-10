(function() {
	'use strict';

	function CrudUtility(CONFIG, $routeParams, $location, ResourceManager, AlertService) {

		this.init = function(vm, type) {

			// set model type
			vm["type"] = type;

			// Mode can either be list, show, create or edit. 
			// It will be set corresponding to which CrudUtility functions is called.  
			vm["mode"] = "";

			// use in edit mode
			vm["selected"] = {}

			// set resources
			vm[CONFIG.models[type].plural] = ResourceManager.readFromStorage(type);
			console.log("in init");
			return vm;

		}

		this.list = function(vm, type) {
			//console.log('CrudUtility.js, line 7: ', 'in this.list()');
			setMode(vm, 'list');
		};

		this.show = function(vm, type) {
			//console.log('CrudUtility.js, line 18: ', 'in this.show()');
			setMode(vm, 'show');
			vm[toCamelCase(type)] = ResourceManager.readFromStorage(type, $routeParams.id);
		};

		this.form = function(vm, type) {
			//console.log('CrudUtility.js, line 30: ', 'in this.form()');
			if ($routeParams.mode == 'edit') {
				this.edit(vm, type);
			} else if ($routeParams.mode == 'create') {
				this.create(vm, type);
			}
		};

		this.create = function(vm, type) {
			//console.log('CrudUtility.js, line 38: ', 'in this.create()');
			setMode(vm, 'create');
		};


		this.edit = function(vm, type) {
			//console.log('in edit');
			//console.log('CrudUtility.js, line 45: ', 'in this.edit()');
			var relationshipsBlueprint = CONFIG.models[type].relationships;
			var resource = ResourceManager.readFromStorage(type, $routeParams.id)
				//console.log(resource);
			setMode(vm, 'edit');
			vm[toCamelCase(type)] = ResourceManager.shallowCopy(resource);
			//console.log(vm[toCamelCase(type)]);

		};

		this.store = function(vm, type, resource) {
			//console.log('CrudUtility.js, line 56: ', 'in this.store()');
			resource["type"] = type;

			resource = prepareSubmittedData(resource);

			ResourceManager.create(resource)
				.then(function(newResource) {
					AlertService.setSuccessMessage("The data has successfully been stored.", true);
					$location.path('/' + newResource.type + '/show/' + newResource.id);

				}, function(reason) {
					AlertService.setErrorMessage(reason, false);
					$location.path();

				});
		};

		this.update = function(vm, type, resource) {
			//console.log('CrudUtility.js, line 67: ', 'in this.update()');

			resource = prepareSubmittedData(resource);
			var edit = this.edit;
			ResourceManager.update(resource)
				.then(function() {
					AlertService.setSuccessMessage("The data has successfully been updated.", false);
					edit(vm, type);
				}, function(reason) {
					AlertService.setErrorMessage(reason, false);
					// $location.path();
				});
		};

		this.destroy = function(vm, type, resource) {
			//console.log('CrudUtility.js, line 77: ', 'in this.destroy()');
			ResourceManager.delete(resource)
				.then(function() {
					if ($location.path() == "/" + resource.type + "/list") {
						AlertService.setSuccessMessage("The data has successfully been deleted.", false);
					} else {
						AlertService.setSuccessMessage("The data has successfully been deleted.", true);
					}
					$location.path("/" + resource.type + "/list");
				}, function(reason) {
					AlertService.setErrorMessage(reason);
					// $location.path();
				});
		};

		var setMode = function(vm, mode) {
			vm['mode'] = mode;
		};

		var toCamelCase = function(string) {
			var result;
			result = string.replace("_", " ");

			result = result.split(" ").map(function(i) {
				return i[0].toUpperCase() + i.substring(1)
			}).join(" ").replace(" ", "");

			return result[0].toLowerCase() + result.substring(1);
		};

		var prepareSubmittedData = function(resource) {
			var attr;
			var id;
			var relationships = CONFIG.models[resource.type].relationships;
			var relationshipModelType;

			for (attr in resource) {
				if (attr in relationships) {
					relationshipModelType = relationships[attr].type;
					if (typeof resource[attr] == 'object') {
						for (id in resource[attr]) {
							if (resource[attr][id] == true) {
								resource[attr][id] = ResourceManager.readFromStorage(relationshipModelType, id);
							} else {
								delete resource[attr][id];
							}
						}
						if (resource[attr].length == 0) {
							delete resource[attr];
						}
					} else {
						resource[attr][resource[attr]] = ResourceManager.readFromStorage(relationshipModelType, resource[attr]);
					}
				}
			}

			return resource;

		};
	}

	CrudUtility.$inject = [
		'CONFIG',
		'$routeParams',
		'$location',
		'ResourceManager',
		'AlertService'
	];

	angular
		.module('Crud')
		.service('CrudUtility', CrudUtility);
})();