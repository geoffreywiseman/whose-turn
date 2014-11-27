'use strict';

// This Gruntfile was generated by Geoffrey Wiseman, typing.

module.exports = function( grunt ) {

	require('time-grunt')(grunt);

	grunt.initConfig( {
		clean: {
			public: [ 'public', '.tmp' ],
			server: '.tmp' 
		},
		express: {
			dev: {
				options: {
					script: 'server/web-server.js',
					output: 'Express \\(development\\) is listening'
				}
			},
			prod: {
				options: {
					script: 'server/web-server.js',
					node_env: 'production',
					output: 'Express \\(production\\) is listening'
				}
			}
		},
		htmlmin: {
			dist: {
			    files: [{
			      expand: true,
			      cwd: 'client',
			      src: ['*.html', 'views/**/*.html'],
			      dest: 'dist'
			    }]
			}
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'client',
					src: '**/*.png',
					dest: 'dist'
				}]
			}
		},
		jshint: {
			options: {
	            reporter: require('jshint-stylish')
	        },
			build: {
				options: {
					node: true
				},
				src: 'Gruntfile.js',
			},
			client: {
				options: { 
					browser: true,
					globals: {
						'angular': false
					}
				},
				src: [
					'client/**/*.js',
					'!client/bower_components/**/*.js'
				]
			},
			server: {
				options: {
					node: true
				},
				src: 'server/**/*.js'
			},
			test: {
				src: [
					'client/**/*.js',
					'test/**/*.js',
					'!client/bower_components/**/*.js'
				]
			}
		},
		karma: {
			unit: {
				configFile: 'test/karma.conf.js',
				singleRun: true
			},
			unitauto: {
				configFile: 'test/karma.conf.js',
				autoWatch: true
			}
		},
		open: {
			localhost: {
				path: 'http://localhost:3000'
			}
		},
		usemin: {
			html: 'dist/index.html'
		},
		useminPrepare: {
			html: 'client/index.html',
			options: {
				dest: 'dist'
			}
		},
		watch: {
			livereload: {
				files: [ 
					'client/**/*.html',
					'client/images/**/*.{png,jpg}',
					'client/styles/**/*.css',
					'client/scripts/**/*.js'
				],
				tasks: [ 'newer:jshint:client' ],
				options: {
					livereload: true
				}
			},
			dev: {
				files: [ 'server/**/*.js' ],
				tasks: [ 'newer:jshint:server', 'express:dev' ],
				options: {
					spawn: false
				}
			},
			bower: {
				files: [ 'client/bower_components/**/*' ],
				tasks: [ 'wiredep' ]
			}
		},
		wiredep: {
			target: {
				src: 'client/index.html'
			}
		}
	});

	// Global Loading
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-newer' );
	grunt.loadNpmTasks( 'grunt-wiredep' );

	// Custom Tasks
	  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
	    this.async();
	  });


	grunt.registerTask( 'serve', 'Set up an express server to run the node.js API and deliver the angular front-end to a browser.', 
		function (target) {
			// Loading Tasks from NPM Modules for "serve" task
			grunt.loadNpmTasks( 'grunt-contrib-clean' );
			grunt.loadNpmTasks( 'grunt-express-server' );
			grunt.loadNpmTasks( 'grunt-open' );

			if( target === 'prod' ) {
				grunt.task.run(
					'clean',
					'build',
					'express:prod',
					'express-keepalive'
					);
			} else {
				// by default, start up in 'dev' mode
				grunt.loadNpmTasks( 'grunt-contrib-watch' );
				grunt.task.run( 
					'clean:server',
					'newer:jshint',
					'express:dev',
					'open:localhost',
					'watch'
				);
			}
		} );
	grunt.registerTask( 'build', 
		'Create a dist/ folder and deliver a minified/uglified version of the site to it.',
		function () {
			// Loading Tasks from NPM Modules for "build" task
			grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
			grunt.loadNpmTasks( 'grunt-usemin' );
			grunt.loadNpmTasks( 'grunt-contrib-concat' );
			grunt.loadNpmTasks( 'grunt-contrib-uglify' );
			grunt.loadNpmTasks( 'grunt-contrib-htmlmin' );
			grunt.loadNpmTasks( 'grunt-contrib-imagemin' );

			// Run Tasks
			grunt.task.run(
				'wiredep',
				'useminPrepare', 
				'newer:jshint',
				'newer:imagemin',
				'concat', 
				'htmlmin', 
				'cssmin', 
				'uglify', 
				'usemin'
			);
		} );
	grunt.registerTask( 'test', 'Run Karma tests (with optional :watch to stay alive and re-run)', function (target) {
		grunt.loadNpmTasks( 'grunt-karma' );

		if( target === 'watch' ) {
			grunt.loadNpmTasks( 'grunt-contrib-watch' );
			grunt.task.run( 'karma:watch', 'watch:test' );
		} else if( target === 'auto' ) {
			grunt.task.run( 'jshint:test', 'karma:unitauto' );
		} else {
			grunt.task.run( 'jshint:test', 'karma:unit' );
		}
	} );
	grunt.registerTask( 'default', 'Clean and then build.',
		function () {
			grunt.loadNpmTasks( 'grunt-contrib-clean' );
			grunt.task.run( 'clean', 'build' );
		} );

};
