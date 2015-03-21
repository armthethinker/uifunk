module.exports = function(grunt) {

   grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      banner: '/*!\n' +
      ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
      ' * Copyright 2015-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' */\n',
      concat: {
         options: {
            separator: '\n'
         },
         css: {
            src: ['css/built-bootstrap+mr.css',
                  'css/plugins/font-awesome.css',
                  'css/plugins/animate.css',
                  'css/plugins/select2.css',
                  'css/plugins/select2-bootstrap.css',
                  'css/built-plugin-overrides.css'],
            dest: 'static/css/<%= pkg.name %>-v<%= pkg.version %>.css'
         },
         js: {
            src: ['js/bootstrap.min.js',
                  'js/plugins/select2.js',
                  'js/plugins/fixie.js',
                  'js/plugins/holder.js',
                  'js/uifunk.js'],
            dest: 'static/js/<%= pkg.name %>-v<%= pkg.version %>.js'
         }
      },
      uglify: {
         dist: {
            files: {
               'static/js/<%= pkg.name %>-v<%= pkg.version %>.min.js': ['static/js/<%= pkg.name %>-v<%= pkg.version %>.js']
            }
         }
      },
      cssmin: {
         dist: {
            files: [{
               expand: true,
               cwd: 'static/css/',
               src: ['*.css', '!*.min.css'],
               dest: 'static/css/',
               ext: '.min.css'
            }]
         }
      },
      copy: {
         fonts: {
            src: 'fonts/*',
            dest: 'static/'
         },
         select2: {
            flatten: true,
            expand: true,
            src: 'img/select2/*',
            dest: 'static/css/'
         },
      },
      clean: ["static/*"],
      less: {
         mixin: {
            options: {
               sourceMap: false,
            },
            src: ['css/less/components/mixins/utility-belt.less'],
            dest: 'css/less/components/built-utility-belt.less'
         },
         dev: {
            options: {
               banner: '<%= banner %>',
               stripBanners: false,
               sourceMap: true,
               sourceMapFilename: 'static/css/<%= pkg.name %>-v<%= pkg.version %>.css.map'
            },
            src: ['css/less/build.less'],
            dest: 'css/built-bootstrap+mr.css'
         },
         overrides: {
            options: {
               sourceMap: false,
            },
            src: ['css/less/components/plugin-overrides.less'],
            dest: 'css/built-plugin-overrides.css'
         },
      },
      watch: {
         options: {
            livereload: true
         },
         less:{
            files: ['css/less/**'],
            tasks: ['css']
         },
         js:{
            files: ['js/**'],
            tasks: ['js']
         },
         html:{
            files: ['*.php', '*.html', '*/*.php', '*/*.html', '*/*/*.php', '*/*/*.html' ],
            tasks: []
         },
      },
      // 'ftp-deploy': {
      //    full: {
      //       auth: {
      //          host: 'SETUP',
      //          port: 21,
      //          authKey: 'key1'
      //       },
      //       src: '../uifunk/',
      //       dest: '',
      //       exclusions: [],
      //       forceVerbose: true
      //    }
      // },
      autoprefixer: {
        options: {
            browsers: ['last 3 versions']
         },
         // prefix all files
         normal: {
            expand: true,
            flatten: true,
            src: 'static/css/*.css',
            dest: 'static/css/'
         }
      },
      replace: {
         glyphicon: {
            src: ['static/css/*'],             // source files array (supports minimatch)
            dest: 'static/css/',             // destination directory or file
            replacements: [{
               from: 'glyphicon',                   // string replacement
               to: 'fa'
            }]
         }
      }
   });

   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-less');    
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-cssmin');   
   grunt.loadNpmTasks('grunt-contrib-concat');   
   grunt.loadNpmTasks('grunt-contrib-clean');    
   grunt.loadNpmTasks('grunt-contrib-copy');    
   grunt.loadNpmTasks('grunt-ftp-deploy');
   grunt.loadNpmTasks('grunt-autoprefixer');
   grunt.loadNpmTasks('grunt-text-replace');
   //img-min //SETUP

   //Slim task runners
   grunt.registerTask('default', ['less:dev', 'concat:js', 'watch']);
   grunt.registerTask('css', ['less:dev', 'concat:css', 'replace', 'watch']);
   grunt.registerTask('js', ['concat:js', 'watch']);

   //Production ready task runners
   grunt.registerTask('full', ['clean', 'copy', 'less', 'concat', 'replace', 'autoprefixer', 'cssmin', 'uglify']);
   grunt.registerTask('deploy', ['full', 'ftp-deploy']);
};