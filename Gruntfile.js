'use strict';

module.exports = function( grunt ) {

	require('time-grunt')(grunt);

	grunt.initConfig( {
		clean: {
			public: [ 'public', '.tmp' ]
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
				src: 'client/**/*.js',
			},
			server: {
				options: {
					node: true
				},
				src: 'server/**/*.js'
			}
		},
		useminPrepare: {
			html: 'client/index.html',
			options: {
				dest: 'dist'
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
		usemin: {
			html: 'dist/index.html'
		}
	});

	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-newer' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-usemin' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-htmlmin' );

	grunt.registerTask( 'build', [ 'useminPrepare', 'newer:jshint', 'concat', 'htmlmin', 'cssmin', 'uglify', 'usemin' ] );
	grunt.registerTask( 'default', [ 'clean', 'build' ] );

};
