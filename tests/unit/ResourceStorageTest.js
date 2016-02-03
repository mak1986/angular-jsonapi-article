(function() {

	'use strict';

	var testApp = angular.module('testApp', ['ArticlesApp']);
	testApp.config(['CONFIG', function(CONFIG) {
		//console.log('testApp CONFIG' + CONFIG);
	}]);


	describe('ResourceStorage', function() {

		var $cacheFactory, CONFIG, ResourceStorage;
		var models;

		function build(config) {
			beforeEach(module('ArticlesApp'));
			beforeEach(function() {
				module(function($provide) {
					//console.log('change to bar');
					$provide.constant('CONFIG', config);
				});
			});

			beforeEach(module('testApp'))
			beforeEach(module('Storage'));
			beforeEach(inject(function(_$httpBackend_, _$cacheFactory_, _CONFIG_, _ResourceStorage_) {
				$cacheFactory = _$cacheFactory_;
				CONFIG = _CONFIG_;
				ResourceStorage = _ResourceStorage_;

			}));
			beforeEach(function() {
				models = {
					"user1": {
						"type": "user",
						"id": "1",
						"name": "John"
					},
					"user2": {
						"type": "user",
						"id": "2",
						"name": "Peter"
					},
					"article1": {
						"type": "article",
						"id": "1",
						"title": "title 1",
						"body": "body 1"
					},
					"article2": {
						"type": "article",
						"id": "2",
						"title": "title 2",
						"body": "body 2"
					},
					"comment1": {
						"type": "comment",
						"id": "1",
						"text": "text 1"
					},
					"comment2": {
						"type": "comment",
						"id": "2",
						"text": "text 2"
					},
					"group1": {
						"type": "group",
						"id": "1",
					},
					"group2": {
						"type": "group",
						"id": "2"
					},
					"product1": {
						"type": "product",
						"id": "1",
						"name": "rental 1"
					},
					"product2": {
						"type": "product",
						"id": "2",
						"name": "rental 2"
					},
					"kind1": {
						"type": "kind",
						"id": "1",
						"name": "kind 1"
					},
					"kind2": {
						"type": "kind",
						"id": "2",
						"name": "kind 2"
					}
				}
			});
		}



		function attributeEqual(testObj, expectedObj) {
			var relationshipsSet = ["articles", "article", "comments", "comment", "user"];
			var key;
			for (key in expectedObj) {
				if (relationshipsSet.indexOf(key) < 0) {
					expect(testObj[key]).toEqual(expectedObj[key]);
				}
			}
		}

		function deepAttributeEqual(collection, chain, expectedObj) {
			var params = chain.split(".");
			var temp = collection;
			var i;
			var length = params.length;
			for (i = 0; i < length; i++) {
				expect(temp[params[i]]).toBeDefined();
				temp = temp[params[i]];
			}
			attributeEqual(temp, expectedObj);
		}

		function relationshipsEqualConfig(testObj, config) {
			var relationships = config["models"]["relationships"];
			var relationshipsSet = ["articles", "article", "comments", "comment", "user"];
			var key;
			for (key in relationshipsSet) {
				if (relationshipsSet.indexOf(key) > -1) {
					expect(testObj[key]).toBeDefined();
				} else {
					expect(testObj[key]).toBeUndefined();
				}
			}
		}
		describe('Configuration 1', function() {
			var config = {
				"models": {
					"article": {
						"relationships": {}
					}
				}
			};
			build(config);

			it('should initialize an empty cache object for article (config 1)', function() {
				expect(ResourceStorage.get('article')).toEqual({});
			});

			it('should insert the objects into the storage correctly (config 1 combination 1)', function() {

				var list = [
					models["article1"]
				];

				ResourceStorage.insert(list);
				var articles = ResourceStorage.get('article');

				expect(Object.keys(articles).length).toEqual(1);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
			});

			it('should insert the objects into the storage correctly (config 1 combination 2)', function() {

				var list = [
					models["article1"],
					models["article2"]
				];

				ResourceStorage.insert(list);
				var articles = ResourceStorage.get('article');

				expect(Object.keys(articles).length).toEqual(2);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
			});
		});


		describe('Configuration 2', function() {

			var config = {
				"models": {
					"user": {
						"relationships": {
							"articles": {
								"type": "article",
								"isArray": true,
								"cascadeDelete": false
							}
						}
					},
					"article": {
						"relationships": {
							"user": {
								"type": "user",
								"isArray": false,
								"cascadeDelete": true
							}
						}
					}
				}
			};

			build(config);

			it('should initialize an empty cache object for user and article (config 2)', function() {
				expect(ResourceStorage.get('user')).toEqual({});
				expect(ResourceStorage.get('article')).toEqual({});
			});

			it('should insert the objects into the storage correctly (config 2 combination 1)', function() {

				var list = [
					models["user1"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');

				expect(Object.keys(users).length).toEqual(1);
				expect(Object.keys(articles).length).toEqual(0);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(0);
			});

			it('should insert the objects into the storage correctly (config 2 combination 2)', function() {

				var list = [
					models["user1"],
					models["user2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(0);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(0);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(0);
			});

			it('should insert the objects into the storage correctly (config 2 combination 3)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["article1"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');

				expect(Object.keys(users).length).toEqual(1);
				expect(Object.keys(articles).length).toEqual(1);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);
			});

			it('should insert the objects into the storage correctly (config 2 combination 4)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(1);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(0);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);
			});

			it('should insert the objects into the storage correctly (config 2 combination 5)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["user2"]["articles"] = {
					"2": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article2"]["user"] = {
					"2": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(1);
				deepAttributeEqual(users, '2.articles.2.user.2', models["user2"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				deepAttributeEqual(articles, '2.user.2.articles.2', models["article2"]);
			});

			it('should insert the objects into the storage correctly (config 2 combination 6)', function() {

				models["user1"]["articles"] = {
					"1": null,
					"2": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article2"]["user"] = {
					"1": null
				}
				var list = [
					models["user1"],
					models["article1"],
					models["article2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');

				expect(Object.keys(users).length).toEqual(1);
				expect(Object.keys(articles).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(2);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.articles.2.user.1', models["user1"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				deepAttributeEqual(articles, '2.user.1.articles.2', models["article2"]);
			});
		});

		describe('Configuration 3', function() {
			var config = {
				"models": {
					"user": {
						"relationships": {
							"articles": {
								"type": "article",
								"isArray": true,
								"cascadeDelete": false
							},
							"comments": {
								"type": "comment",
								"isArray": true,
								"cascadeDelete": false
							}
						}
					},
					"article": {
						"relationships": {
							"user": {
								"type": "user",
								"isArray": false,
								"cascadeDelete": true
							},
							"comments": {
								"type": "comment",
								"isArray": true,
								"cascadeDelete": false
							}
						}
					},
					"comment": {
						"relationships": {
							"user": {
								"type": "user",
								"isArray": false,
								"cascadeDelete": true
							},
							"article": {
								"type": "article",
								"isArray": false,
								"cascadeDelete": true
							}
						}
					}
				}
			};
			build(config);

			it('should initialize an empty cache object for article (config 3)', function() {
				expect(ResourceStorage.get('user')).toEqual({});
				expect(ResourceStorage.get('article')).toEqual({});
				expect(ResourceStorage.get('comment')).toEqual({});
			});

			it('should insert the objects into the storage correctly (config 3 combination 1)', function() {

				var list = [
					models["user1"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(1);
				expect(Object.keys(articles).length).toEqual(0);
				expect(Object.keys(comments).length).toEqual(0);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(0);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(0);
			});

			it('should insert the objects into the storage correctly (config 3 combination 2)', function() {

				var list = [
					models["user1"],
					models["user2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(0);
				expect(Object.keys(comments).length).toEqual(0);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(0);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(0);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(0);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(0);
			});

			it('should insert the objects into the storage correctly (config 3 combination 3)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["article1"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(1);
				expect(Object.keys(articles).length).toEqual(1);
				expect(Object.keys(comments).length).toEqual(0);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 4)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(1);
				expect(Object.keys(comments).length).toEqual(0);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(0);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(0);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);

			});
			it('should insert the objects into the storage correctly (config 3 combination 5)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["user2"]["articles"] = {
					"2": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article2"]["user"] = {
					"2": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);
				expect(Object.keys(comments).length).toEqual(0);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(0);
				deepAttributeEqual(users, '2.articles.2.user.2', models["user2"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["2"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '2.user.2.articles.2', models["article2"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 6)', function() {

				models["user1"]["articles"] = {
					"1": null,
					"2": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article2"]["user"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["article1"],
					models["article2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(1);
				expect(Object.keys(articles).length).toEqual(2);
				expect(Object.keys(comments).length).toEqual(0);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(2);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.articles.2.user.1', models["user1"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["2"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '2.user.1.articles.2', models["article2"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 7)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["user1"]["comments"] = {
					"1": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article1"]["comments"] = {
					"1": null
				};
				models["comment1"]["user"] = {
					"1": null
				};
				models["comment1"]["article"] = {
					"1": null
				}
				var list = [
					models["user1"],
					models["article1"],
					models["comment1"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(1);
				expect(Object.keys(articles).length).toEqual(1);
				expect(Object.keys(comments).length).toEqual(1);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(1);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.1.user.1', models["user1"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(1);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.1.article.1', models["article1"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.1.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.1.comments.1', models["comment1"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 8)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["user1"]["comments"] = {
					"1": null,
					"2": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article1"]["comments"] = {
					"1": null,
					"2": null
				};
				models["comment1"]["user"] = {
					"1": null
				};
				models["comment1"]["article"] = {
					"1": null
				};
				models["comment2"]["user"] = {
					"1": null
				};
				models["comment2"]["article"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["article1"],
					models["comment1"],
					models["comment2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(1);
				expect(Object.keys(articles).length).toEqual(1);
				expect(Object.keys(comments).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(2);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.2.user.1', models["user1"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(2);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.1.article.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.2.article.1', models["article1"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.1.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.1.comments.1', models["comment1"]);

				attributeEqual(comments["2"], models["comment2"]);
				relationshipsEqualConfig(comments["2"], config);
				expect(Object.keys(comments["2"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["2"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '2.user.1.comments.2', models["comment2"]);
				deepAttributeEqual(comments, '2.article.1.comments.2', models["comment2"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 9)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["user1"]["comments"] = {
					"1": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article1"]["comments"] = {
					"1": null
				};
				models["comment1"]["user"] = {
					"1": null
				};
				models["comment1"]["article"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["comment1"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(1);
				expect(Object.keys(comments).length).toEqual(1);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(1);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.1.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(0);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(0);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(1);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.1.article.1', models["article1"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.1.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.1.comments.1', models["comment1"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 10)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["user1"]["comments"] = {
					"1": null,
					"2": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article1"]["comments"] = {
					"1": null,
					"2": null
				};
				models["comment1"]["user"] = {
					"1": null
				};
				models["comment1"]["article"] = {
					"1": null
				};
				models["comment2"]["user"] = {
					"1": null
				};
				models["comment2"]["article"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["comment1"],
					models["comment2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(1);
				expect(Object.keys(comments).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(2);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.2.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(0);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(0);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(2);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.1.article.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.2.article.1', models["article1"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.1.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.1.comments.1', models["comment1"]);

				attributeEqual(comments["2"], models["comment2"]);
				relationshipsEqualConfig(comments["2"], config);
				expect(Object.keys(comments["2"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["2"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '2.user.1.comments.2', models["comment2"]);
				deepAttributeEqual(comments, '2.article.1.comments.2', models["comment2"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 11)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["user2"]["comments"] = {
					"1": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article1"]["comments"] = {
					"1": null
				};
				models["comment1"]["user"] = {
					"2": null
				};
				models["comment1"]["article"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["comment1"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(1);
				expect(Object.keys(comments).length).toEqual(1);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(0);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(1);
				deepAttributeEqual(users, '2.comments.1.user.2', models["user2"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(1);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.1.article.1', models["article1"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.2.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.1.comments.1', models["comment1"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 12)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["user2"]["comments"] = {
					"1": null,
					"2": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article1"]["comments"] = {
					"1": null,
					"2": null
				};
				models["comment1"]["user"] = {
					"2": null
				};
				models["comment1"]["article"] = {
					"1": null
				}
				models["comment2"]["user"] = {
					"2": null
				};
				models["comment2"]["article"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["comment1"],
					models["comment2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(1);
				expect(Object.keys(comments).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(0);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(2);
				deepAttributeEqual(users, '2.comments.1.user.2', models["user2"]);
				deepAttributeEqual(users, '2.comments.2.user.2', models["user2"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(2);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.1.article.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.2.article.1', models["article1"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.2.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.1.comments.1', models["comment1"]);

				attributeEqual(comments["2"], models["comment2"]);
				relationshipsEqualConfig(comments["2"], config);
				expect(Object.keys(comments["2"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["2"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '2.user.2.comments.2', models["comment2"]);
				deepAttributeEqual(comments, '2.article.1.comments.2', models["comment2"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 13)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["user1"]["comments"] = {
					"1": null
				};
				models["user2"]["comments"] = {
					"2": null
				}
				models["article1"]["user"] = {
					"1": null
				};
				models["article1"]["comments"] = {
					"1": null,
					"2": null
				};
				models["comment1"]["user"] = {
					"1": null
				};
				models["comment1"]["article"] = {
					"1": null
				};
				models["comment2"]["user"] = {
					"2": null
				};
				models["comment2"]["article"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["comment1"],
					models["comment2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(1);
				expect(Object.keys(comments).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(1);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.1.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(0);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(1);
				deepAttributeEqual(users, '2.comments.2.user.2', models["user2"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(2);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.1.article.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.2.article.1', models["article1"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.1.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.1.comments.1', models["comment1"]);

				attributeEqual(comments["2"], models["comment2"]);
				relationshipsEqualConfig(comments["2"], config);
				expect(Object.keys(comments["2"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["2"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '2.user.2.comments.2', models["comment2"]);
				deepAttributeEqual(comments, '2.article.1.comments.2', models["comment2"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 14)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["user1"]["comments"] = {
					"1": null
				};
				models["user2"]["articles"] = {
					"2": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article1"]["comments"] = {
					"1": null
				};
				models["article2"]["user"] = {
					"2": null
				};
				models["comment1"]["user"] = {
					"1": null
				};
				models["comment1"]["article"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"],
					models["comment1"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);
				expect(Object.keys(comments).length).toEqual(1);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(1);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.1.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(0);
				deepAttributeEqual(users, '2.articles.2.user.2', models["user2"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(1);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.1.article.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["2"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '2.user.2.articles.2', models["article2"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.1.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.1.comments.1', models["comment1"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 15)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["user1"]["comments"] = {
					"1": null,
					"2": null
				};
				models["user2"]["articles"] = {
					"2": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article1"]["comments"] = {
					"1": null,
					"2": null
				};
				models["article2"]["user"] = {
					"2": null
				};
				models["comment1"]["user"] = {
					"1": null
				};
				models["comment1"]["article"] = {
					"1": null
				};
				models["comment2"]["user"] = {
					"1": null
				};
				models["comment2"]["article"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"],
					models["comment1"],
					models["comment2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);
				expect(Object.keys(comments).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(2);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.2.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(0);
				deepAttributeEqual(users, '2.articles.2.user.2', models["user2"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(2);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.1.article.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.2.article.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["2"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '2.user.2.articles.2', models["article2"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.1.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.1.comments.1', models["comment1"]);

				attributeEqual(comments["2"], models["comment2"]);
				relationshipsEqualConfig(comments["2"], config);
				expect(Object.keys(comments["2"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["2"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '2.user.1.comments.2', models["comment2"]);
				deepAttributeEqual(comments, '2.article.1.comments.2', models["comment2"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 16)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["user2"]["articles"] = {
					"2": null
				};
				models["user2"]["comments"] = {
					"1": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article1"]["comments"] = {
					"1": null
				};
				models["article2"]["user"] = {
					"2": null
				};
				models["comment1"]["user"] = {
					"2": null
				};
				models["comment1"]["article"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"],
					models["comment1"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);
				expect(Object.keys(comments).length).toEqual(1);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(1);
				deepAttributeEqual(users, '2.articles.2.user.2', models["user2"]);
				deepAttributeEqual(users, '2.comments.1.user.2', models["user2"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(1);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.1.article.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["2"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '2.user.2.articles.2', models["article2"]);


				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.2.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.1.comments.1', models["comment1"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 17)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["user2"]["articles"] = {
					"2": null
				};
				models["user2"]["comments"] = {
					"1": null,
					"2": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article1"]["comments"] = {
					"1": null,
					"2": null
				};
				models["article2"]["user"] = {
					"2": null
				};
				models["comment1"]["user"] = {
					"2": null
				};
				models["comment1"]["article"] = {
					"1": null
				}
				models["comment2"]["user"] = {
					"2": null
				};
				models["comment2"]["article"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"],
					models["comment1"],
					models["comment2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);
				expect(Object.keys(comments).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(2);
				deepAttributeEqual(users, '2.articles.2.user.2', models["user2"]);
				deepAttributeEqual(users, '2.comments.1.user.2', models["user2"]);
				deepAttributeEqual(users, '2.comments.2.user.2', models["user2"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(2);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.1.article.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.2.article.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["2"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '2.user.2.articles.2', models["article2"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.2.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.1.comments.1', models["comment1"]);

				attributeEqual(comments["2"], models["comment2"]);
				relationshipsEqualConfig(comments["2"], config);
				expect(Object.keys(comments["2"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["2"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '2.user.2.comments.2', models["comment2"]);
				deepAttributeEqual(comments, '2.article.1.comments.2', models["comment2"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 18)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["user1"]["comments"] = {
					"1": null
				};
				models["user2"]["articles"] = {
					"2": null
				};
				models["user2"]["comments"] = {
					"2": null
				}
				models["article1"]["user"] = {
					"1": null
				};
				models["article1"]["comments"] = {
					"1": null,
					"2": null
				};
				models["article2"]["user"] = {
					"2": null
				};
				models["comment1"]["user"] = {
					"1": null
				};
				models["comment1"]["article"] = {
					"1": null
				};
				models["comment2"]["user"] = {
					"2": null
				};
				models["comment2"]["article"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"],
					models["comment1"],
					models["comment2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);
				expect(Object.keys(comments).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(1);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.1.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(1);
				deepAttributeEqual(users, '2.articles.2.user.2', models["user2"]);
				deepAttributeEqual(users, '2.comments.2.user.2', models["user2"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(2);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.1.article.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.2.article.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["2"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '2.user.2.articles.2', models["article2"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.1.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.1.comments.1', models["comment1"]);

				attributeEqual(comments["2"], models["comment2"]);
				relationshipsEqualConfig(comments["2"], config);
				expect(Object.keys(comments["2"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["2"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '2.user.2.comments.2', models["comment2"]);
				deepAttributeEqual(comments, '2.article.1.comments.2', models["comment2"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 19)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["user1"]["comments"] = {
					"1": null
				};
				models["user2"]["articles"] = {
					"2": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article2"]["user"] = {
					"2": null
				};
				models["article2"]["comments"] = {
					"1": null
				};
				models["comment1"]["user"] = {
					"1": null
				};
				models["comment1"]["article"] = {
					"2": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"],
					models["comment1"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);
				expect(Object.keys(comments).length).toEqual(1);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(1);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.1.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(0);
				deepAttributeEqual(users, '2.articles.2.user.2', models["user2"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["2"]["comments"]).length).toEqual(1);
				deepAttributeEqual(articles, '2.user.2.articles.2', models["article2"]);
				deepAttributeEqual(articles, '2.comments.1.article.2', models["article2"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.1.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.2.comments.1', models["comment1"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 20)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["user1"]["comments"] = {
					"1": null,
					"2": null
				};
				models["user2"]["articles"] = {
					"2": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article2"]["user"] = {
					"2": null
				};
				models["article2"]["comments"] = {
					"1": null,
					"2": null
				};
				models["comment1"]["user"] = {
					"1": null
				};
				models["comment1"]["article"] = {
					"2": null
				};
				models["comment2"]["user"] = {
					"1": null
				};
				models["comment2"]["article"] = {
					"2": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"],
					models["comment1"],
					models["comment2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);
				expect(Object.keys(comments).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(2);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.2.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(0);
				deepAttributeEqual(users, '2.articles.2.user.2', models["user2"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["2"]["comments"]).length).toEqual(2);
				deepAttributeEqual(articles, '2.user.2.articles.2', models["article2"]);
				deepAttributeEqual(articles, '2.comments.1.article.2', models["article2"]);
				deepAttributeEqual(articles, '2.comments.2.article.2', models["article2"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.1.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.2.comments.1', models["comment1"]);

				attributeEqual(comments["2"], models["comment2"]);
				relationshipsEqualConfig(comments["2"], config);
				expect(Object.keys(comments["2"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["2"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '2.user.1.comments.2', models["comment2"]);
				deepAttributeEqual(comments, '2.article.2.comments.2', models["comment2"]);
			});

			it('should insert the objects into the storage correctly (config 3 combination 21)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["user2"]["articles"] = {
					"2": null
				};
				models["user2"]["comments"] = {
					"1": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article2"]["user"] = {
					"2": null
				};
				models["article2"]["comments"] = {
					"1": null
				};
				models["comment1"]["user"] = {
					"2": null
				};
				models["comment1"]["article"] = {
					"2": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"],
					models["comment1"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);
				expect(Object.keys(comments).length).toEqual(1);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(1);
				deepAttributeEqual(users, '2.articles.2.user.2', models["user2"]);
				deepAttributeEqual(users, '2.comments.1.user.2', models["user2"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["2"]["comments"]).length).toEqual(1);
				deepAttributeEqual(articles, '2.user.2.articles.2', models["article2"]);
				deepAttributeEqual(articles, '2.comments.1.article.2', models["article2"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.2.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.2.comments.1', models["comment1"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 22)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["user2"]["articles"] = {
					"2": null
				};
				models["user2"]["comments"] = {
					"1": null,
					"2": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article2"]["user"] = {
					"2": null
				};
				models["article2"]["comments"] = {
					"1": null,
					"2": null
				};
				models["comment1"]["user"] = {
					"2": null
				};
				models["comment1"]["article"] = {
					"2": null
				};
				models["comment2"]["user"] = {
					"2": null
				};
				models["comment2"]["article"] = {
					"2": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"],
					models["comment1"],
					models["comment2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);
				expect(Object.keys(comments).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(2);
				deepAttributeEqual(users, '2.articles.2.user.2', models["user2"]);
				deepAttributeEqual(users, '2.comments.1.user.2', models["user2"]);
				deepAttributeEqual(users, '2.comments.2.user.2', models["user2"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["2"]["comments"]).length).toEqual(2);
				deepAttributeEqual(articles, '2.user.2.articles.2', models["article2"]);
				deepAttributeEqual(articles, '2.comments.1.article.2', models["article2"]);
				deepAttributeEqual(articles, '2.comments.2.article.2', models["article2"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.2.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.2.comments.1', models["comment1"]);

				attributeEqual(comments["2"], models["comment2"]);
				relationshipsEqualConfig(comments["2"], config);
				expect(Object.keys(comments["2"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["2"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '2.user.2.comments.2', models["comment2"]);
				deepAttributeEqual(comments, '2.article.2.comments.2', models["comment2"]);
			});

			it('should insert the objects into the storage correctly (config 3 combination 23)', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["user1"]["comments"] = {
					"1": null
				};
				models["user2"]["articles"] = {
					"2": null
				};
				models["user2"]["comments"] = {
					"2": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article2"]["user"] = {
					"2": null
				};
				models["article2"]["comments"] = {
					"1": null,
					"2": null
				};
				models["comment1"]["user"] = {
					"1": null
				};
				models["comment1"]["article"] = {
					"2": null
				};
				models["comment2"]["user"] = {
					"2": null
				};
				models["comment2"]["article"] = {
					"2": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"],
					models["comment1"],
					models["comment2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);
				expect(Object.keys(comments).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(1);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.1.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(1);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(1);
				deepAttributeEqual(users, '2.articles.2.user.2', models["user2"]);
				deepAttributeEqual(users, '2.comments.2.user.2', models["user2"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["2"]["comments"]).length).toEqual(2);
				deepAttributeEqual(articles, '2.user.2.articles.2', models["article2"]);
				deepAttributeEqual(articles, '2.comments.1.article.2', models["article2"]);
				deepAttributeEqual(articles, '2.comments.2.article.2', models["article2"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.1.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.2.comments.1', models["comment1"]);

				attributeEqual(comments["2"], models["comment2"]);
				relationshipsEqualConfig(comments["2"], config);
				expect(Object.keys(comments["2"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["2"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '2.user.2.comments.2', models["comment2"]);
				deepAttributeEqual(comments, '2.article.2.comments.2', models["comment2"]);
			});

			it('should insert the objects into the storage correctly (config 3 combination 24)', function() {

				models["user1"]["articles"] = {
					"1": null,
					"2": null
				};
				models["user1"]["comments"] = {
					"1": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article1"]["comments"] = {
					"1": null
				};
				models["article2"]["user"] = {
					"1": null
				};
				models["comment1"]["user"] = {
					"1": null
				};
				models["comment1"]["article"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"],
					models["comment1"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);
				expect(Object.keys(comments).length).toEqual(1);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(2);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(1);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.articles.2.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.1.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(0);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(0);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(1);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.1.article.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["2"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '2.user.1.articles.2', models["article2"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.1.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.1.comments.1', models["comment1"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 25)', function() {

				models["user1"]["articles"] = {
					"1": null,
					"2": null
				};
				models["user1"]["comments"] = {
					"1": null,
					"2": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article1"]["comments"] = {
					"1": null,
					"2": null
				};
				models["article2"]["user"] = {
					"1": null
				};
				models["comment1"]["user"] = {
					"1": null
				};
				models["comment1"]["article"] = {
					"1": null
				};
				models["comment2"]["user"] = {
					"1": null
				};
				models["comment2"]["article"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"],
					models["comment1"],
					models["comment2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);
				expect(Object.keys(comments).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(2);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(2);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.articles.2.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.2.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(0);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(0);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(2);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.1.article.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.2.article.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["2"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '2.user.1.articles.2', models["article2"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.1.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.1.comments.1', models["comment1"]);

				attributeEqual(comments["2"], models["comment2"]);
				relationshipsEqualConfig(comments["2"], config);
				expect(Object.keys(comments["2"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["2"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '2.user.1.comments.2', models["comment2"]);
				deepAttributeEqual(comments, '2.article.1.comments.2', models["comment2"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 26)', function() {

				models["user1"]["articles"] = {
					"1": null,
					"2": null
				};
				models["user2"]["comments"] = {
					"1": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article1"]["comments"] = {
					"1": null
				};
				models["article2"]["user"] = {
					"1": null
				};
				models["comment1"]["user"] = {
					"2": null
				};
				models["comment1"]["article"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"],
					models["comment1"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);
				expect(Object.keys(comments).length).toEqual(1);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(2);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.articles.2.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(0);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(1);
				deepAttributeEqual(users, '2.comments.1.user.2', models["user2"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(1);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.1.article.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["2"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '2.user.1.articles.2', models["article2"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.2.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.1.comments.1', models["comment1"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 27)', function() {

				models["user1"]["articles"] = {
					"1": null,
					"2": null
				};
				models["user2"]["comments"] = {
					"1": null,
					"2": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article1"]["comments"] = {
					"1": null,
					"2": null
				};
				models["article2"]["user"] = {
					"1": null
				};
				models["comment1"]["user"] = {
					"2": null
				};
				models["comment1"]["article"] = {
					"1": null
				};
				models["comment2"]["user"] = {
					"2": null
				};
				models["comment2"]["article"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"],
					models["comment1"],
					models["comment2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);
				expect(Object.keys(comments).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(2);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.articles.2.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(0);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(2);
				deepAttributeEqual(users, '2.comments.1.user.2', models["user2"]);
				deepAttributeEqual(users, '2.comments.2.user.2', models["user2"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(2);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.1.article.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.2.article.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["2"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '2.user.1.articles.2', models["article2"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.2.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.1.comments.1', models["comment1"]);

				attributeEqual(comments["2"], models["comment2"]);
				relationshipsEqualConfig(comments["2"], config);
				expect(Object.keys(comments["2"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["2"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '2.user.2.comments.2', models["comment2"]);
				deepAttributeEqual(comments, '2.article.1.comments.2', models["comment2"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 28)', function() {

				models["user1"]["articles"] = {
					"1": null,
					"2": null
				};
				models["user1"]["comments"] = {
					"1": null
				};
				models["user2"]["comments"] = {
					"2": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article1"]["comments"] = {
					"1": null,
					"2": null
				};
				models["article2"]["user"] = {
					"1": null
				};
				models["comment1"]["user"] = {
					"1": null
				};
				models["comment1"]["article"] = {
					"1": null
				};
				models["comment2"]["user"] = {
					"2": null
				};
				models["comment2"]["article"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"],
					models["comment1"],
					models["comment2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);
				expect(Object.keys(comments).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(2);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(1);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.articles.2.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.1.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(0);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(1);
				deepAttributeEqual(users, '2.comments.2.user.2', models["user2"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(2);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.1.article.1', models["article1"]);
				deepAttributeEqual(articles, '1.comments.2.article.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["2"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '2.user.1.articles.2', models["article2"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.1.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.1.comments.1', models["comment1"]);

				attributeEqual(comments["2"], models["comment2"]);
				relationshipsEqualConfig(comments["2"], config);
				expect(Object.keys(comments["2"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["2"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '2.user.2.comments.2', models["comment2"]);
				deepAttributeEqual(comments, '2.article.1.comments.2', models["comment2"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 29)', function() {

				models["user1"]["articles"] = {
					"1": null,
					"2": null
				};
				models["user1"]["comments"] = {
					"1": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article2"]["user"] = {
					"1": null
				};
				models["article2"]["comments"] = {
					"1": null
				};
				models["comment1"]["user"] = {
					"1": null
				};
				models["comment1"]["article"] = {
					"2": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"],
					models["comment1"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);
				expect(Object.keys(comments).length).toEqual(1);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(2);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(1);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.articles.2.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.1.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(0);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(0);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["2"]["comments"]).length).toEqual(1);
				deepAttributeEqual(articles, '2.user.1.articles.2', models["article2"]);
				deepAttributeEqual(articles, '2.comments.1.article.2', models["article2"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.1.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.2.comments.1', models["comment1"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 30)', function() {

				models["user1"]["articles"] = {
					"1": null,
					"2": null
				};
				models["user1"]["comments"] = {
					"1": null,
					"2": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article2"]["user"] = {
					"1": null
				};
				models["article2"]["comments"] = {
					"1": null,
					"2": null
				};
				models["comment1"]["user"] = {
					"1": null
				};
				models["comment1"]["article"] = {
					"2": null
				};
				models["comment2"]["user"] = {
					"1": null
				};
				models["comment2"]["article"] = {
					"2": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"],
					models["comment1"],
					models["comment2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);
				expect(Object.keys(comments).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(2);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(2);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.articles.2.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.2.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(0);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(0);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["2"]["comments"]).length).toEqual(2);
				deepAttributeEqual(articles, '2.user.1.articles.2', models["article2"]);
				deepAttributeEqual(articles, '2.comments.1.article.2', models["article2"]);
				deepAttributeEqual(articles, '2.comments.2.article.2', models["article2"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.1.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.2.comments.1', models["comment1"]);

				attributeEqual(comments["2"], models["comment2"]);
				relationshipsEqualConfig(comments["2"], config);
				expect(Object.keys(comments["2"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["2"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '2.user.1.comments.2', models["comment2"]);
				deepAttributeEqual(comments, '2.article.2.comments.2', models["comment2"]);
			});

			it('should insert the objects into the storage correctly (config 3 combination 31)', function() {

				models["user1"]["articles"] = {
					"1": null,
					"2": null
				};
				models["user2"]["comments"] = {
					"1": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article2"]["user"] = {
					"1": null
				};
				models["article2"]["comments"] = {
					"1": null
				};
				models["comment1"]["user"] = {
					"2": null
				};
				models["comment1"]["article"] = {
					"2": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"],
					models["comment1"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);
				expect(Object.keys(comments).length).toEqual(1);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(2);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.articles.2.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(0);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(1);
				deepAttributeEqual(users, '2.comments.1.user.2', models["user2"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["2"]["comments"]).length).toEqual(1);
				deepAttributeEqual(articles, '2.user.1.articles.2', models["article2"]);
				deepAttributeEqual(articles, '2.comments.1.article.2', models["article2"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.2.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.2.comments.1', models["comment1"]);

			});

			it('should insert the objects into the storage correctly (config 3 combination 32)', function() {

				models["user1"]["articles"] = {
					"1": null,
					"2": null
				};
				models["user2"]["comments"] = {
					"1": null,
					"2": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article2"]["user"] = {
					"1": null
				};
				models["article2"]["comments"] = {
					"1": null,
					"2": null
				};
				models["comment1"]["user"] = {
					"2": null
				};
				models["comment1"]["article"] = {
					"2": null
				};
				models["comment2"]["user"] = {
					"2": null
				};
				models["comment2"]["article"] = {
					"2": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"],
					models["comment1"],
					models["comment2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);
				expect(Object.keys(comments).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(2);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.articles.2.user.1', models["user1"]);


				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(0);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(2);
				deepAttributeEqual(users, '2.comments.1.user.2', models["user2"]);
				deepAttributeEqual(users, '2.comments.2.user.2', models["user2"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["2"]["comments"]).length).toEqual(2);
				deepAttributeEqual(articles, '2.user.1.articles.2', models["article2"]);
				deepAttributeEqual(articles, '2.comments.1.article.2', models["article2"]);
				deepAttributeEqual(articles, '2.comments.2.article.2', models["article2"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.2.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.2.comments.1', models["comment1"]);

				attributeEqual(comments["2"], models["comment2"]);
				relationshipsEqualConfig(comments["2"], config);
				expect(Object.keys(comments["2"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["2"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '2.user.2.comments.2', models["comment2"]);
				deepAttributeEqual(comments, '2.article.2.comments.2', models["comment2"]);
			});

			it('should insert the objects into the storage correctly (config 3 combination 33)', function() {

				models["user1"]["articles"] = {
					"1": null,
					"2": null
				};
				models["user1"]["comments"] = {
					"1": null
				};
				models["user2"]["comments"] = {
					"2": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article2"]["user"] = {
					"1": null
				};
				models["article2"]["comments"] = {
					"1": null,
					"2": null
				};
				models["comment1"]["user"] = {
					"1": null
				};
				models["comment1"]["article"] = {
					"2": null
				};
				models["comment2"]["user"] = {
					"2": null
				};
				models["comment2"]["article"] = {
					"2": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"],
					models["comment1"],
					models["comment2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);
				expect(Object.keys(comments).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(Object.keys(users["1"]["articles"]).length).toEqual(2);
				expect(Object.keys(users["1"]["comments"]).length).toEqual(1);
				deepAttributeEqual(users, '1.articles.1.user.1', models["user1"]);
				deepAttributeEqual(users, '1.articles.2.user.1', models["user1"]);
				deepAttributeEqual(users, '1.comments.1.user.1', models["user1"]);

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(Object.keys(users["2"]["articles"]).length).toEqual(0);
				expect(Object.keys(users["2"]["comments"]).length).toEqual(1);
				deepAttributeEqual(users, '2.comments.2.user.2', models["user2"]);

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(Object.keys(articles["1"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["1"]["comments"]).length).toEqual(0);
				deepAttributeEqual(articles, '1.user.1.articles.1', models["article1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(Object.keys(articles["2"]["user"]).length).toEqual(1);
				expect(Object.keys(articles["2"]["comments"]).length).toEqual(2);
				deepAttributeEqual(articles, '2.user.1.articles.2', models["article2"]);
				deepAttributeEqual(articles, '2.comments.1.article.2', models["article2"]);
				deepAttributeEqual(articles, '2.comments.2.article.2', models["article2"]);

				attributeEqual(comments["1"], models["comment1"]);
				relationshipsEqualConfig(comments["1"], config);
				expect(Object.keys(comments["1"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["1"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '1.user.1.comments.1', models["comment1"]);
				deepAttributeEqual(comments, '1.article.2.comments.1', models["comment1"]);

				attributeEqual(comments["2"], models["comment2"]);
				relationshipsEqualConfig(comments["2"], config);
				expect(Object.keys(comments["2"]["user"]).length).toEqual(1);
				expect(Object.keys(comments["2"]["article"]).length).toEqual(1);
				deepAttributeEqual(comments, '2.user.2.comments.2', models["comment2"]);
				deepAttributeEqual(comments, '2.article.2.comments.2', models["comment2"]);

			});
		});

		describe('Configuration 4', function() {
			var config = {
				"models": {
					"user": {
						"relationships": {}
					},
					"article": {
						"relationships": {
							"user": {
								"type": "user",
								"isArray": false,
								"cascadeDelete": true
							}
						}
					}
				}
			};
			build(config);

			it('should initialize an empty cache object for article (config 4)', function() {
				expect(ResourceStorage.get('user')).toEqual({});
				expect(ResourceStorage.get('article')).toEqual({});
			});

			it('should insert the objects into the storage correctly (config 4 combination 1)', function() {

				var list = [
					models["user1"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');

				expect(Object.keys(users).length).toEqual(1);
				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(users["1"].article).toBeUndefined();
				expect(users["1"].articles).toBeUndefined();

			});

			it('should insert the objects into the storage correctly (config 4 combination 2)', function() {

				var list = [
					models["user1"],
					models["user2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');

				expect(Object.keys(users).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(users["1"].articles).toBeUndefined();

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(users["1"].article).toBeUndefined();
				expect(users["1"].articles).toBeUndefined();
			});

			it('should insert the objects into the storage correctly (config 4 combination 3)', function() {
				models["article1"]["user"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["article1"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');

				expect(Object.keys(users).length).toEqual(1);
				expect(Object.keys(articles).length).toEqual(1);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(users["1"].article).toBeUndefined();
				expect(users["1"].articles).toBeUndefined();

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(articles["1"].user).toBeDefined();
				deepAttributeEqual(articles, '1.user.1', models["user1"]);

			});

			it('should insert the objects into the storage correctly (config 4 combination 4)', function() {
				models["article1"]["user"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(1);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(users["1"].article).toBeUndefined();
				expect(users["1"].articles).toBeUndefined();

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(users["2"].article).toBeUndefined();
				expect(users["2"].articles).toBeUndefined();

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(articles["1"].user).toBeDefined();
				deepAttributeEqual(articles, '1.user.1', models["user1"]);

			});

			it('should insert the objects into the storage correctly (config 4 combination 5)', function() {
				models["article1"]["user"] = {
					"1": null
				};
				models["article2"]["user"] = {
					"2": null
				};
				var list = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["article2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(users["1"].article).toBeUndefined();
				expect(users["1"].articles).toBeUndefined();

				attributeEqual(users["2"], models["user2"]);
				relationshipsEqualConfig(users["2"], config);
				expect(users["2"].article).toBeUndefined();
				expect(users["2"].articles).toBeUndefined();

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(articles["1"].user).toBeDefined();
				deepAttributeEqual(articles, '1.user.1', models["user1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(articles["2"].user).toBeDefined();
				deepAttributeEqual(articles, '2.user.2', models["user2"]);

			});

			it('should insert the objects into the storage correctly (config 4 combination 6)', function() {
				models["article1"]["user"] = {
					"1": null
				};
				models["article2"]["user"] = {
					"1": null
				};
				var list = [
					models["user1"],
					models["article1"],
					models["article2"]
				];

				ResourceStorage.insert(list);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');

				expect(Object.keys(users).length).toEqual(1);
				expect(Object.keys(articles).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(users["1"].article).toBeUndefined();
				expect(users["1"].articles).toBeUndefined();

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(articles["1"].user).toBeDefined();
				deepAttributeEqual(articles, '1.user.1', models["user1"]);

				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(articles["2"].user).toBeDefined();
				deepAttributeEqual(articles, '2.user.1', models["user1"]);

			});

		});


		describe('Configuration 4 special', function() {
			var config = {
				"models": {
					"user": {
						"relationships": {}
					},
					"article": {
						"relationships": {
							"user": {
								"type": "user",
								"isArray": false,
								"cascadeDelete": true
							}
						}
					}
				}
			};
			build(config);

			it('should insert the objects into the storage correctly, when storage is not empty(config 4 special)', function() {

				models["article1"]["user"] = {
					"1": null
				};
				models["article2"]["user"] = {
					"2": null
				};
				var list1 = [
					models["user1"],
					models["user2"]
				];
				var list2 = [
					models["article1"],
					models["article2"]
				]

				ResourceStorage.insert(list1);
				ResourceStorage.insert(list2);
				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');

				expect(Object.keys(users).length).toEqual(2);
				expect(Object.keys(articles).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(users["1"].article).toBeUndefined();
				expect(users["1"].articles).toBeUndefined();


				attributeEqual(users["1"], models["user1"]);
				relationshipsEqualConfig(users["1"], config);
				expect(users["1"].article).toBeUndefined();
				expect(users["1"].articles).toBeUndefined();

				attributeEqual(articles["1"], models["article1"]);
				relationshipsEqualConfig(articles["1"], config);
				expect(articles["1"].user).toBeDefined();
				deepAttributeEqual(articles, '1.user.1', models["user1"]);


				attributeEqual(articles["2"], models["article2"]);
				relationshipsEqualConfig(articles["2"], config);
				expect(articles["2"].user).toBeDefined();
				deepAttributeEqual(articles, '2.user.2', models["user2"]);
			});

		});

		describe('Updates', function() {
			var config = {
				"models": {
					"user": {
						"relationships": {
							"groups": {
								"type": "group",
								"isArray": true,
								"cascadeDelete": false
							}
						}
					},
					"group": {
						"relationships": {
							"users": {
								"type": "user",
								"isArray": true,
								"cascadeDelete": false
							}
						}
					},
					"kind": {
						"relationships": {
							"products": {
								"type":"product",
								"isArray":true,
								"cascadeDelete": false
							}
						}
					},
					"product": {
						"relationships": {
							"kind": {
								"type": "kind",
								"isArray": false,
								"cascadeDelete": true
							}
						}
					}
				}
			};
			build(config);

			it('should update the attribute in the storage correctly', function() {

				models["user1"]["groups"] = {
					"1": null,
					"2": null
				};
				models["group1"]["users"] = {
					"1": null
				};
				models["group2"]["users"] = {
					"1": null
				};

				var list1 = [
					models["user1"],
					models["group1"],
					models["group2"]
				];

				ResourceStorage.insert(list1);
				var user1 = angular.copy(models["user1"]);
				user1.name = "Peter";
				delete user1.groups;

				ResourceStorage.update(user1);

				var users = ResourceStorage.get('user');

				expect(Object.keys(users).length).toEqual(1);
				expect(users[1].name).toEqual("Peter")
				deepAttributeEqual(users, '1.groups.1', models["group1"]);
				deepAttributeEqual(users, '1.groups.2', models["group2"]);

			});


			it('should update 1-n-1 relationships (add 1 relationship)', function() {

				models["user1"]["groups"] = {
					"1": null
				};
				models["group1"]["users"] = {
					"1": null
				};

				var list1 = [
					models["user1"],
					models["group1"],
					models["group2"]
				];

				ResourceStorage.insert(list1);

				var user1 = angular.copy(models["user1"]);
				delete user1.name;
				user1.groups = {
					"1": null,
					"2": null
				};


				ResourceStorage.update(user1);

				var users = ResourceStorage.get('user');
				var groups = ResourceStorage.get('group');

				expect(Object.keys(users).length).toEqual(1);
				expect(Object.keys(groups).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);

				deepAttributeEqual(users, '1.groups.1', models["group1"]);
				deepAttributeEqual(users, '1.groups.2', models["group2"]);

				deepAttributeEqual(groups, '1.users.1', models["user1"]);
				deepAttributeEqual(groups, '2.users.1', models["user1"]);

			});

			it('should update 1-n-1 relationships (remove 1 relationship)', function() {

				models["user1"]["groups"] = {
					"1": null,
					"2": null
				};
				models["group1"]["users"] = {
					"1": null
				};
				models["group2"]["users"] = {
					"1": null
				};
				var list1 = [
					models["user1"],
					models["group1"],
					models["group2"]
				];

				ResourceStorage.insert(list1);

				var user1 = angular.copy(models["user1"]);
				delete user1.name;
				user1.groups = {
					"1": null
				};

				ResourceStorage.update(user1);

				var users = ResourceStorage.get('user');
				var groups = ResourceStorage.get('group');

				expect(Object.keys(users).length).toEqual(1);
				expect(Object.keys(groups).length).toEqual(2);

				attributeEqual(users["1"], models["user1"]);

				deepAttributeEqual(users, '1.groups.1', models["group1"]);
				deepAttributeEqual(groups, '1.users.1', models["user1"]);

				expect(users["1"].groups["2"]).toBeUndefined();
				expect(groups["2"].users["1"]).toBeUndefined();
			});

			it('should update 1-n relationships', function() {

				models["product1"]["kind"] = {
					"1": null
				};
				var list1 = [
					models["product1"],
					models["kind1"],
					models["kind2"]
				];

				ResourceStorage.insert(list1);

				var product1 = angular.copy(models["product1"]);
				delete product1.kind;
				product1.kind = {
					"2": null
				};

				ResourceStorage.update(product1);

				var products = ResourceStorage.get('product');
				var kinds = ResourceStorage.get('kind');

				expect(Object.keys(products).length).toEqual(1);
				expect(Object.keys(kinds).length).toEqual(2);

				attributeEqual(products["1"], models["product1"]);

				deepAttributeEqual(products, '1.kind.2', models["kind2"]);
				expect(products["1"].kind["1"]).toBeUndefined();
			});

			it('should update a reverse 1-n relationships', function() {

				models["product1"]["kind"] = {
					"1": null
				};
				models["product2"]["kind"] = {
					"1": null
				};
				models["kind1"]["products"] = {
					"1": null,
					"2": null
				};
				var list1 = [
					models["product1"],
					models["product2"],
					models["kind1"]
				];

				ResourceStorage.insert(list1);

				var kind1 = angular.copy(models["kind1"]);
				delete kind1.products;
				kind1.products = {
					"1": null
				};

				ResourceStorage.update(kind1);

				var kinds = ResourceStorage.get('kind');
				var products = ResourceStorage.get('product');

				expect(Object.keys(kinds).length).toEqual(1);
				expect(Object.keys(products).length).toEqual(1);

				attributeEqual(kinds["1"], models["kind1"]);
				attributeEqual(products["1"], models["product1"]);

				deepAttributeEqual(kinds, '1.products.1', models["product1"]);
				expect(kinds["1"].products["2"]).toBeUndefined();
			});
		});


		describe('Delete', function() {
			var config = {
				"models": {
					"user": {
						"relationships": {
							"articles": {
								"type": "article",
								"isArray": true,
								"cascadeDelete": false
							},
							"comments": {
								"type": "comment",
								"isArray": true,
								"cascadeDelete": false
							}
						}
					},
					"article": {
						"relationships": {
							"user": {
								"type": "user",
								"isArray": false,
								"cascadeDelete": true
							},
							"comments": {
								"type": "comment",
								"isArray": true,
								"cascadeDelete": false
							}
						}
					},
					"comment": {
						"relationships": {
							"article": {
								"type": "article",
								"isArray": false,
								"cascadeDelete": true
							},
							"user": {
								"type": "user",
								"isArray": false,
								"cascadeDelete": true
							}
						}
					}
				}
			};
			build(config);

			it('should delete the resource with no relationships from the storage', function() {

				var list1 = [
					models["user1"],
					models["user2"]
				];

				ResourceStorage.insert(list1);

				ResourceStorage.delete(models["user1"]);

				var users = ResourceStorage.get('user');

				expect(Object.keys(users).length).toEqual(1);
				expect(users[2].name).toEqual("Peter")

			});


			it('should delete the resource with a relationships from the storage', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["article1"]["user"] = {
					"1": null
				};

				var list1 = [
					models["user1"],
					models["article1"]
				];

				ResourceStorage.insert(list1);

				ResourceStorage.delete(models["article1"]);

				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');

				expect(Object.keys(users).length).toEqual(1);
				expect(Object.keys(articles).length).toEqual(0);

				attributeEqual(users["1"], models["user1"]);
				expect(users[1].articles[1]).toBeUndefined();

			});

			it('should delete the resource with 2 relationships from the storage', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["comment1"]["user"] = {
					"1": null
				};

				var list1 = [
					models["user1"],
					models["article1"],
					models["comment1"]
				];

				ResourceStorage.insert(list1);

				ResourceStorage.delete(models["comment1"]);

				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(1);
				expect(Object.keys(articles).length).toEqual(1);
				expect(Object.keys(comments).length).toEqual(0);

				attributeEqual(users["1"], models["user1"]);
				attributeEqual(articles["1"], models["article1"]);

				expect(articles[1].comments[1]).toBeUndefined();
				expect(users[1].comments[1]).toBeUndefined();
			});
			
			it('should cascade delete the resource with 1 relationships from the storage', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["article1"]["user"] = {
					"1": null
				};

				var list1 = [
					models["user1"],
					models["article1"]
				];

				ResourceStorage.insert(list1);

				ResourceStorage.delete(models["user1"]);

				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');

				expect(Object.keys(users).length).toEqual(0);
				expect(Object.keys(articles).length).toEqual(0);

			});

			it('should chain cascade delete the resource from the storage', function() {

				models["user1"]["articles"] = {
					"1": null
				};
				models["user2"]["comments"] = {
					"1": null
				};
				models["article1"]["user"] = {
					"1": null
				};
				models["article1"]["comments"] = {
					"1": null
				};
				models["comment1"]["user"] = {
					"1": null
				};
				models["comment1"]["article"] = {
					"1": null
				};

				var list1 = [
					models["user1"],
					models["user2"],
					models["article1"],
					models["comment1"]
				];

				ResourceStorage.insert(list1);

				ResourceStorage.delete(models["user1"]);

				var users = ResourceStorage.get('user');
				var articles = ResourceStorage.get('article');
				var comments = ResourceStorage.get('comment');

				expect(Object.keys(users).length).toEqual(1);
				expect(Object.keys(articles).length).toEqual(0);
				expect(Object.keys(comments).length).toEqual(0);

				attributeEqual(users["2"], models["user2"]);
			});
		});
	});
})();