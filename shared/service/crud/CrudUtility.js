(function() {
	'use strict';

	function CrudUtility($location, $routeParams, CONFIG, Alert, ResourceManager) {

		this.init = function(vm, type) {
			//console.log("in init");

			// set model type
			vm["type"] = type;
			vm["type_dash"] = type.split("_").join("-").replace('--','-');
			vm["type_singular"] = CONFIG.models[type].singular;
			vm["type_plural"] = CONFIG.models[type].plural;

			// Mode can either be list, show, create or edit. 
			// It will be set corresponding to which CrudUtility functions is called.  
			vm["mode"] = "";

			// use in edit mode
			vm["selected"] = {}

			// set resources
			vm[vm["type_plural"]] = ResourceManager.readFromStorage(type);

			return vm;

		}

		this.list = function(vm, type) {
			setMode(vm, 'list');
		};

		this.show = function(vm, type) {
			setMode(vm, 'show');
			vm[vm["type_singular"]] = ResourceManager.readFromStorage(type, $routeParams.id);
			//console.log(vm);
		};

		this.form = function(vm, type) {
			//console.log(vm['site']);
			if ($routeParams.mode == 'edit') {
				this.edit(vm, type);
			} else if ($routeParams.mode == 'create') {
				this.create(vm, type);
			}
		};

		this.create = function(vm, type) {
			setMode(vm, 'create');
		};


		this.edit = function(vm, type) {
			var relationshipsBlueprint = CONFIG.models[type].relationships;
			var resource = ResourceManager.readFromStorage(type, $routeParams.id)

			setMode(vm, 'edit');
			vm[vm['type_singular']] = ResourceManager.shallowCopy(resource);
			//console.log(vm[vm['type_singular']]);
		};

		this.store = function(vm, type, resource, stayOnPage) {
			resource["type"] = type;
			//console.log(resource);
			resource = prepareSubmittedData(resource);

			ResourceManager.create(resource)
				.then(function(newResource) {

					if (stayOnPage) {
						Alert.setSuccessMessage('model.' + type, "ui.stored", false);
						$location.path();
					} else {
						Alert.setSuccessMessage('model.' + type, "ui.stored", true);
						$location.path('/' + vm["type_dash"] + '/show/' + newResource.id);
					}

				}, function(reason) {
					Alert.setErrorMessage(false);
					$location.path();

				});
		};

		this.update = function(vm, type, resource, stayOnPage) {
			var edit = this.edit;

			resource = prepareSubmittedData(resource);

			ResourceManager.update(resource)
				.then(function() {
					//edit(vm, type);
					if (stayOnPage) {
						Alert.setSuccessMessage('model.' + type, "ui.updated", false);
						$location.path();
					} else {
						Alert.setSuccessMessage('model.' + type, "ui.updated", true);
						$location.path("/" + vm["type_dash"] + "/list");
					}
				}, function(reason) {
					Alert.setErrorMessage(false);
					$location.path();
				});
		};

		this.destroy = function(vm, type, resource) {
			ResourceManager.delete(resource)
				.then(function() {
					if ($location.path() == "/" + vm["type_dash"] + "/list") {
						Alert.setSuccessMessage('model.' + type, "ui.deleted", false);
					} else {
						Alert.setSuccessMessage('model.' + type, "ui.deleted", true);
					}
					$location.path("/" + vm["type_dash"] + "/list");
				}, function(reason) {
					Alert.setErrorMessage(false);
					// $location.path();
				});
		};

		var setMode = function(vm, mode) {
			vm['mode'] = mode;
		};

		var prepareSubmittedData = function(resource) {
			var attr;
			var id;
			var relationships = CONFIG.models[resource.type].relationships;
			var relationshipModelType;

			if (resource['$$hashKey']) {
				delete resource['$$hashKey'];
			}

			for (attr in resource) {
				if (attr in relationships) {
					relationshipModelType = relationships[attr].type;
					if (CONFIG.models[resource.type].relationships[attr].isArray) {
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
						//edit
						if (resource[attr].id) {
							id = resource[attr].id;
						} else {
							//create
							id = resource[attr];
							resource[attr] = {};
						}
						resource[attr][id] = ResourceManager.readFromStorage(relationshipModelType, id);
						delete resource[attr].id;
					}
				} else {

					if (CONFIG.models[resource.type].structure[attr] && CONFIG.models[resource.type].structure[attr].type == 'boolean') {
						resource[attr] = (resource[attr] == "true" || resource[attr] == "1");
					}
				}

			}

			return resource;

		};
	}

	CrudUtility.$inject = [
		'$location',
		'$routeParams',
		'CONFIG',
		'Alert',
		'ResourceManager'
	];

	angular
		.module('_Crud')
		.service('CrudUtility', CrudUtility);
})();