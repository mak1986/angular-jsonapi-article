(function() {

	'use strict';

	var testApp = angular.module('testApp', ['ArticlesApp']);

	describe('JsonApiResourceConverter', function() {

		var CONFIG, JsonApiResourceConverter;

		function build(config) {
			beforeEach(module('ArticlesApp'));

			beforeEach(function() {
				module(function($provide) {
					$provide.constant('CONFIG', config);
				});
			});

			beforeEach(module('testApp'));

			beforeEach(inject(function(_CONFIG_, _JsonApiResourceConverter_) {
				CONFIG = _CONFIG_;
				JsonApiResourceConverter = _JsonApiResourceConverter_;
			}));
		}

		describe('JsonApiResouceConvert.toJsonApi test', function() {
			var config = {
				"models": {
					"article": {
						"relationships": {
							'user': {
								"type": 'user'
							}
						}
					},
					'user': {
						'relationships': {}
					},
					'comment': {
						'relationships': {
							'article': {
								"type": 'article'
							},
							'user': {
								"type": 'user'
							}
						}
					}
				}
			};
			build(config);

			it('should have toJsonApi method defined', function() {
				expect(JsonApiResourceConverter.toJsonApi).toBeDefined();
			});


			it('should convert a resource to a post jsonApi', function() {
				var article = {
					'type': 'article',
					'title': 'title 1',
					'body': 'body 1'
				};

				var jsonApi = JsonApiResourceConverter.toJsonApi(article);

				expect(jsonApi).toEqual({
					'data': {
						'type': 'article',
						'attributes': {
							'title': 'title 1',
							'body': 'body 1'
						}
					}
				});
			});



			it('should convert a resource with a relationship to a post jsonApi', function() {
				var user = {
					'id': '1',
					'type': 'user',
					'name': 'John'
				};
				var article = {
					'type': 'article',
					'title': 'title 1',
					'body': 'body 1',
					'user': {
						'1': user
					}
				};

				var jsonApi = JsonApiResourceConverter.toJsonApi(article);

				expect(jsonApi).toEqual({
					'data': {
						'type': 'article',
						'attributes': {
							'title': 'title 1',
							'body': 'body 1'
						},
						'relationships': {
							'user': {
								'data': [{
									'type': 'user',
									'id': '1'
								}]
							}
						}
					}
				});
			});

			it('should convert a resource with 2 relationships to a post jsonApi', function() {
				var user = {
					'id': '1',
					'type': 'user',
					'name': 'John'
				};
				var article = {
					'id': '1',
					'type': 'article',
					'title': 'title 1',
					'body': 'body 1',
					'user': {
						'1': user
					}
				};
				var comment = {
					'type': 'comment',
					'body': 'comment 1',
					'article': {
						'1': article
					},
					'user': {
						'1': user
					}
				};

				var jsonApi = JsonApiResourceConverter.toJsonApi(comment);

				expect(jsonApi).toEqual({
					'data': {
						'type': 'comment',
						'attributes': {
							'body': 'comment 1'
						},
						'relationships': {
							'user': {
								'data': [{
									'type': 'user',
									'id': '1'
								}]
							},
							'article': {
								'data': [{
									'type': 'article',
									'id': '1'
								}]
							}
						}
					}
				});
			});



			it('should convert a resource to a patch jsonApi', function() {
				var article = {
					'id': '1',
					'type': 'article',
					'title': 'title 1'
				};

				var jsonApi = JsonApiResourceConverter.toJsonApi(article);

				expect(jsonApi).toEqual({
					'data': {
						'id': '1',
						'type': 'article',
						'attributes': {
							'title': 'title 1'
						}
					}
				});
			});

			it('should convert a resource with a relation to a patch jsonApi', function() {
				var user = {
					'id': '1',
					'type': 'user',
					'name': 'John'
				};
				var article = {
					'id': '1',
					'type': 'article',
					'title': 'title 1',
					'body': 'body 1',
					'user': {
						'1': user
					}
				};

				var jsonApi = JsonApiResourceConverter.toJsonApi(article);

				expect(jsonApi).toEqual({
					'data': {
						'id': '1',
						'type': 'article',
						'attributes': {
							'title': 'title 1',
							'body': 'body 1'
						},
						'relationships': {
							'user': {
								'data': [{
									'type': 'user',
									'id': '1'
								}]
							}
						}
					}
				});
			});

			it('should convert a relationship to a post jsonapi', function() {
				var relationship = {
					'id': '1',
					'type': 'user',
				};

				var jsonApi = JsonApiResourceConverter.toJsonApi(relationship);

				expect(jsonApi).toEqual({
					'data': {
						'id': '1',
						'type': 'user'
					}
				});
			});
		});



	});
})();