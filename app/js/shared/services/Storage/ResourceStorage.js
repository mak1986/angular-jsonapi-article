(function() {
	'use strict';

	function ResourceStorage($cacheFactory, CONFIG) {

		var storage;

		this.init = function() {
			storage = $cacheFactory('models_storage');
			for (var key in CONFIG.models) {
				storage.put(key, {});
			}
		};

		this.init();

		this.count = function(model) {
			return Object.keys(storage.get(model)).length;
		};

		this.get = function(model) {
			return storage.get(model);
		};

		this.insert = function(resources) {

			for (var i in resources) {

				if (!storage.get(resources[i].type)[resources[i].id]) {
					createStandardResource(resources[i].type, resources[i].id);
				}

				this.update(resources[i]);

			}
		};

		this.update = function(resource) {
			updateAttr(resource);
			updateRef(resource);
		};

		this.delete = function(resource) {
			deleteResource(resource);
		};

		var entangle = function(modelTypes) {
			var modelType;
			var resources;
			var resourceId;
			var relationships;
			var relationshipAlias;
			var relationshipModelType;

			for (var i = 0; i < modelTypes.length; i++) {
				modelType = modelTypes[i];
				resources = storage.get(modelType);

				for (resourceId in resources) {

					relationships = getRelationships(resources[resourceId]);

					for (relationshipAlias in relationships) {

						relationshipModelType = CONFIG.models[modelType].relationships[relationshipAlias].type;

						entangleRelationship(resources[resourceId], relationships[relationshipAlias], relationshipModelType);

					}

				}

			}

		};

		//Updating a Resource's Attributes
		var updateAttr = function(resource) {
			var master = storage.get(resource.type)[resource.id];
			var attr;

			for (attr in resource) {
				if (!(attr in CONFIG.models[resource.type].relationships)) {
					master[attr] = resource[attr];
				}
			}
		};

		//Updating a Resource's Relationships. Performs a complete replacement only for relationships which are included in param.
		var updateRef = function(newResource) {
			var relationshipAlias;
			var oldResource = storage.get(newResource.type)[newResource.id];
			var oldRelationship;
			var newRelationship;
			var id;
			var alias;
			var relationshipModelType;
			var relationshipsBlueprint = CONFIG.models[newResource.type].relationships;
			var relationshipResource;
			var relationshipRelationshipsBlueprint;

			for (relationshipAlias in getRelationships(newResource)) {

				oldRelationship = oldResource[relationshipAlias];
				newRelationship = newResource[relationshipAlias];

				// replace with unentangled relationships.
				oldResource[relationshipAlias] = newRelationship;

				relationshipModelType = relationshipsBlueprint[relationshipAlias].type;

				entangleRelationship(oldResource, oldResource[relationshipAlias], relationshipModelType);

				alias = getAliasByModelType(relationshipModelType, oldResource.type);

				for (id in newRelationship) {
					if (!(id in oldRelationship)) {
						if (alias) oldResource[relationshipAlias][id][alias][oldResource.id] = oldResource;
					}
				}

				for (id in oldRelationship) {
					if (!(id in newRelationship)) {

						if (alias) {
							relationshipResource = storage.get(relationshipModelType)[id];
							relationshipRelationshipsBlueprint = CONFIG.models[relationshipResource.type].relationships;

							delete relationshipResource[alias][oldResource.id];

							if (relationshipRelationshipsBlueprint[alias].cascadeDelete) {
								deleteResource(relationshipResource);
							}
						}
					}
				}

			}
		};

		var deleteResource = function(resource) {
			var resource = storage.get(resource.type)[resource.id];
			var relationshipsBlueprint = CONFIG.models[resource.type].relationships;
			var relationshipAlias;
			var relationship;
			var relationshipModelType;
			var alias;
			var id;
			var relationshipResource;
			var relationshipRelationshipsBlueprint;

			for (relationshipAlias in getRelationships(resource)) {

				relationship = resource[relationshipAlias];

				relationshipModelType = relationshipsBlueprint[relationshipAlias].type;

				alias = getAliasByModelType(relationshipModelType, resource.type);

				for (id in relationship) {
					if (alias) {
						relationshipResource = storage.get(relationshipModelType)[id];
						relationshipRelationshipsBlueprint = CONFIG.models[relationshipResource.type].relationships;

						delete relationshipResource[alias][resource.id];

						if (relationshipRelationshipsBlueprint[alias].cascadeDelete) {
							deleteResource(relationshipResource);
						}
					}
				}

			}

			delete storage.get(resource.type)[resource.id];

		};
		var getAliasByModelType = function(modelType, relationshipModelType) {
			var alias;
			var relationshipAliases = CONFIG.models[modelType].relationships;

			for (alias in relationshipAliases) {
				if (relationshipAliases[alias].type == relationshipModelType) {
					return alias;
				}
			}

			return null;
		};

		var getRelationships = function(resource) {
			var attr;
			var relationshipsBlueprint = CONFIG.models[resource.type].relationships;
			var relationships = {};

			for (attr in resource) {
				if (attr in relationshipsBlueprint) {
					relationships[attr] = resource[attr];
				}
			}

			return relationships;
		};

		var entangleRelationship = function(resource, relationship, relationshipModelType) {
			var id;
			var alias = getAliasByModelType(relationshipModelType, resource.type);

			for (id in relationship) {
				if (!storage.get(relationshipModelType)[id]) {
					createStandardResource(relationshipModelType, id);
				}

				var relationshipResource = storage.get(relationshipModelType)[id];

				if (!relationshipResource[alias]) {
					relationshipResource[alias] = {};
				}

				if (!relationshipResource[alias][resource.id] || relationshipResource[alias][resource.id] == null) {
					relationshipResource[alias][resource.id] = storage.get(resource.type)[resource.id];
				}

				relationship[id] = storage.get(relationshipModelType)[id];
			}
		};

		var createStandardResource = function(type, id) {
			var relationshipAlias;

			storage.get(type)[id] = {
				'id': id,
				'type': type
			};

			for (relationshipAlias in CONFIG.models[type].relationships) {
				storage.get(type)[id][relationshipAlias] = {};
			}
		};
	}

	ResourceStorage.$inject = [
		'$cacheFactory',
		'CONFIG'
	];

	angular
		.module('_Storage')
		.service('ResourceStorage', ResourceStorage);
})();

// entangleRelationship(modelType, resourceId, relationships[relationshipAlias], relationshipModelType);
// var entangleRelationship = function(modelType, resourceId, relationship, relationshipModelType) {
// 		var id;

// 		for (id in relationship) {
// 			if (!storage.get(relationshipModelType)[id] && IS FOREIGN KEY RELATION {
// 					var newRelationObject = {};
// 					newRelationObject.type = relationshipModelType;
// 					newRelationObject.id = id;
// 					// modelTYpe SHOULD BE ALIAS
// 					newRelationObject[modelType] = storage.get(modelType)[resourceId];
// 					storage.get(relationshipModelType)[id] = newRelationObject;
// 				}
// 				relationship[id] = storage.get(relationshipModelType)[id];

// 			}
// 		};