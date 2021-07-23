module.exports = function(grunt){
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        hostname: 'localhost'
    },
    livereload: {
        options: {
            open: {
                 target: 'http://localhost:9000/index.html'
            },
            base: [
                'src'
            ]
        }
    }
    },

    sass: {
      options: {
        precision: 5
      },
      dev: {
        options: {
          style: 'nested', // compact, compressed, nested or expanded
          sourcemap: true
        },
        files: {
          'stylesheets/css/styles.css' : 'stylesheets/scss/styles.scss'
        }
      },
      prod: {
        options: {
          style: 'compressed', // compact, compressed, nested or expanded
          sourcemap: true
        },
        files: {
          'stylesheets/css/styles.css' : 'stylesheets/scss/styles.scss'
        }
      }
    },

    uglify: {
      dev: {
        options: {
          beautify: true
        },
        files: {
          // Where to combine and minify JS files, followed by list of which files to include and exclude
          'js/script.min.js' : ['js/scripts/*.js', 'js/script.js']
        }
      },
      prod: {
        files: {
          // Where to combine and minify JS files, followed by list of which files to include and exclude
          'js/script.min.js' : ['js/scripts/*.js', 'js/script.js', '!js/scripts/livereload.js']
        }
      }
    },

    // Watch options: what tasks to run when changes to files are saved
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['stylesheets/scss/*.scss'],
        tasks: ['sass:dev']
      },
      js: {
        files: ['js/scripts/*.js', '!js/script.min.js'], // Watch for changes in JS files except for script.min.js to avoid reload loops
        tasks: ['uglify:dev']
      }
		}
	});

  grunt.registerTask('default', ['connect','sass:dev','uglify:dev','watch']);
  grunt.registerTask('production', ['sass:prod','uglify:prod']);
};