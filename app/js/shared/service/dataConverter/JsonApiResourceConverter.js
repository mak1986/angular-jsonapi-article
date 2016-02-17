(function() {
	'use strict';

	function JsonApiResourceConverter(CONFIG) {

		this.toJsonApi = function(resource) {
			var i;
			var resourceKey;
			var refKey;
			var jsonApi = {
				"data": {}
			};

			for (resourceKey in resource) {
				if (resourceKey === 'id' || resourceKey === 'type') {
					jsonApi.data[resourceKey] = resource[resourceKey];
				} else if (resourceKey in CONFIG.models[resource.type].relationships) {
					if (!jsonApi.data.relationships) {
						jsonApi.data['relationships'] = {};
					}
					if (!jsonApi.data.relationships[resourceKey]) {
						jsonApi.data.relationships[resourceKey] = {};
						jsonApi.data.relationships[resourceKey]['data'] = [];
					}
					for (refKey in resource[resourceKey]) {
						jsonApi.data.relationships[resourceKey].data.push({
							'type': CONFIG.models[resource.type].relationships[resourceKey].type,
							'id': resource[resourceKey][refKey].id
						});
					}

				} else {
					if (!jsonApi.data.attributes) {
						jsonApi.data['attributes'] = {};
					}
					jsonApi.data.attributes[resourceKey] = resource[resourceKey];
				}
			}

			return jsonApi;
		};

		this.toResourceArray = function(jsonApi) {

			var result = [];
			var mainResult = this.toResourceArrayByLevel(jsonApi, 'data');
			result.push.apply(result, mainResult);
			var refResult = this.toResourceArrayByLevel(jsonApi, 'included');
			result.push.apply(result, refResult);

			return result;

		};

		this.toResourceArrayByLevel = function(jsonApi, level) {

			var data;
			var index;
			var resource;
			var result = [];

			if (!(level in jsonApi.data)) {
				return result;
			}

			data = jsonApi.data[level];

			if (Object.prototype.toString.call(data) === '[object Array]') {
				for (index in data) {
					resource = toResource(data[index]);
					result.push(resource);
				}
			} else {
				resource = toResource(data);
				result.push(resource);
			}

			return result;

		};

		this.getUrlWhere = function(modelType, where) {
			var field;
			var count = 1;
			var whereStatement = "";
			for (field in where) {
				if(count > 1){
					whereStatement += "&";
				}
				whereStatement += "filter[" + field + "]=" + where[field];
				count++;
			}
			return CONFIG.url.api + "/" + modelType + "?" + whereStatement;
		};

		var toResource = function(data) {

			var resource = {
				id: data.id,
				type: data.type,
			};

			resource = attachAttibutes(resource, data);
			resource = attachRelationshipsKeys(resource, data);

			return resource;

		};

		var attachAttibutes = function(resource, data) {

			var attrKey;

			if ('attributes' in data) {
				for (attrKey in data.attributes) {
					resource[attrKey] = data.attributes[attrKey];
				}
			}

			return resource;
		};

		var attachRelationshipsKeys = function(resource, data) {
			var relationName;
			var relatedData;
			var relationIndex;

			if ('relationships' in data) {
				for (relationName in data.relationships) {
					if (data["relationships"][relationName]["data"]) {
						relatedData = data.relationships[relationName].data;
						resource[relationName] = {};
						if (relatedData instanceof Array) {
							for (relationIndex in relatedData) {
								resource[relationName][relatedData[relationIndex].id] = null;
							}
						} else {
							resource[relationName][relatedData.id] = null;
						}
					}
				}
			}

			return resource;
		};
	}

	JsonApiResourceConverter.$inject = [
		'CONFIG'
	];

	angular
		.module('_DataConverter')
		.service('JsonApiResourceConverter', JsonApiResourceConverter);
})();