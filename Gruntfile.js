module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),     //存储在package.json文件中的JSON元数据引入到grunt config中
    // banner: '/*!\n' +
    //         ' * version:<%= pkg.version %> (<%= pkg.homepage %>)\n' +
    //         ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
    //         ' * Licensed under the <%= pkg.license %> license\n' +
    //         ' */\n',
    uglify: {                                    //指定了一个banner选项(用于在文件顶部生成一个注释)，
        options: {
            stripBanners: true,                    //紧接着是一个单一的名为build的uglify目标，用于将一个js文件压缩为一个目标文件
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
            src: 'public/*.js',
            dest: 'build/<%= pkg.name %>-<%= pkg.version %>.min.js'
        }
    },
    jshint: {
        build: ['Gruntfile.js', 'public/Answer.js', 'public/score.js'],
        options: {
            jshint: '.jshint'
        },
        ignore_warning: {
          options: {
            '-W015': true,
          },
          src: ['**/*.js'],
        }
    },
    watch: {
        files: ['public/*.js'],
        tasks: ['jshint']
    }
    // watch: {
    //     css: {
    //         files: ['public/*.css'],
    //         tasks: ['compass'],
    //         options: {
    //         // Start a live reload server on the default port 35729
    //         livereload: true,
    //         },
    //     },
    //     another: {
    //         files: ['lib/*.js'],
    //         tasks: ['anothertask'],
    //         options: {
    //         // Start another live reload server on port 1337
    //         livereload: 1337,
    //         },
    //     }
    // }
  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-contrib-jshint");


  grunt.loadNpmTasks('grunt-contrib-watch');


    // grunt.loadNpmTasks("grunt-contrib-copy");
    // grunt.loadNpmTasks("grunt-contrib-less");
    // grunt.loadNpmTasks("grunt-contrib-jshint");
    // grunt.loadNpmTasks("grunt-contrib-uglify");
    // grunt.loadNpmTasks("grunt-contrib-watch");
    // grunt.loadNpmTasks("grunt-contrib-clean");
    // grunt.loadNpmTasks("grunt-contrib-cssmin");

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['uglify','jshint']);
  grunt.registerTask('check', ['jshint']);


};
