module.exports = function(grunt) {

// Project Configuration
grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	uglify: {
		options: {
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		},
		build: {
        	src: 'src/<%= pkg.name %>.js',
   	    	dest: 'build/<%= pkg.name %>.min.js'
		}
	},
	run: {
		wget: {
			cmd: 'wget',
			args: [
				'localhost:3000',
				'--recursive',
				'--no-host-directories',
				'--directory-prefix=temp',
				'--level=0',
				'--no-verbose',
				'--html-extension'
			]
		},
	},
	bootlint: {
		options: {
			showallerrors: true
		},
		files: ['temp/*.html', 'temp/poems/*.html']
	},
	csslint: {
		src: ['public/stylesheets/*.css']
	},
	linkChecker: {
		options: {
			maxConcurrency: 20
		},
	  default: {
	    site: 'localhost',
	    options: {
	      initialPort: 3000
	    }
	  }
	},
  htmllint: {
    all: ["temp/**/*.html"]
  }
});

	grunt.registerTask('test', function () {
	    var tasks = [
        'run:wget',
				'htmllint',
				'bootlint',
				'csslint',
				'linkChecker'
	    ];

	    tasks.forEach(function (task) {
	        grunt.task.run(task);
	    });
	});

	// Load the plugin that profides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default tasks.
	grunt.registerTask('default', ['uglify']);

	// grunt-html for linting html.
	grunt.loadNpmTasks('grunt-html');

	// grunt-run for calling executables, shell scripts, etc.  Needed in order to run wget in particular.
	grunt.loadNpmTasks('grunt-run');

	// Linter for twitter bootstrap.
	grunt.loadNpmTasks('grunt-bootlint');

	// Linter for css files
	grunt.loadNpmTasks('grunt-contrib-csslint');

	// Grunt dead link checker
	grunt.loadNpmTasks('grunt-link-checker');

	// Grunt HTML Linter
	grunt.loadNpmTasks('grunt-html');
};
