module.exports = function (config) {
	'use strict';
	
	config.set({

		basePath: '../',

		files: [
			'bower_components/angular/angular.js',
			//'bower_components/ng-prettyjson/dist/ng-prettyjson.min.js',
      		'node_modules/angular-mocks/angular-mocks.js',
			'tests/fakeApp.js',
			//'app/js/app.js',
			'app/js/shared/**/_*.js',
			'app/js/shared/**/*.js',
			'app/js/controllers/**/*.js',
			'tests/unit/**/*.js'
		],
	
		autoWatch: true,

		frameworks: ['jasmine'],

		browsers: ['PhantomJS'],

		plugins: [
			'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-coverage'
		],

		reporters: ['progress', 'coverage'],

		coverageReporter: {
			dir: 'tests/coverage',
			reporters: [
				{ type: 'html' },
				{ type: 'lcovonly' }
			]
		},

		singleRun: true

	});
};