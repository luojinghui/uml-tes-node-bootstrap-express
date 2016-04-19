module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),     //存储在package.json文件中的JSON元数据引入到grunt config中
    banner: '/*!\n' +
            ' * version:<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under the <%= pkg.license %> license\n' +
            ' */\n',
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
        // files: ['public/*.js'],
        // tasks: ['jshint'],
        less: {
             files: ["./public/less/*"],
             tasks: ["less", "autoprefixer:development"],
             options: {
               livereload: true
         }
    },
    concat:{
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */',
        //定义一个字符串插入没个文件之间用于连接输出
        separator: ';'
      },
      dist: {
          src: ['public/question.js','public/Answer.js'],
          dest: 'build/concat.js'
      }
 }
    },
    less: {
      development: {
        options: {
          paths: ['public/css'],
          yuicompress: false
        },
        files: {
          './public/css/result.css': './public/less/style.less'
        }
      }
    //   ,
    //   production: {
    //     options: {
    //       paths: ['assets/css'],
    //       plugins: [
    //         new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions", 'ie 8', 'ie 9']}),
    //         new (require('less-plugin-clean-css'))(cleanCssOptions)
    //       ],
    //       modifyVars: {
    //         imgPath: '"http://mycdn.com/path/to/images"',
    //         bgColor: 'red'
    //       }
    //     },
    //     files: {
    //       'path/to/result.css': 'path/to/source.less'
    //     }
    //   }
    },
    autoprefixer: {
        development: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9'],
                expand: true,
                flatten: true,
                src: 'public/css/*.css',
                dest: 'public/css'
              }
    }
  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');


    // grunt.loadNpmTasks("grunt-contrib-copy");
    // grunt.loadNpmTasks("grunt-contrib-less");
    // grunt.loadNpmTasks("grunt-contrib-jshint");
    // grunt.loadNpmTasks("grunt-contrib-uglify");
    // grunt.loadNpmTasks("grunt-contrib-watch");
    // grunt.loadNpmTasks("grunt-contrib-clean");
    // grunt.loadNpmTasks("grunt-contrib-cssmin");

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['uglify','jshint','less']);
  grunt.registerTask('check', ['jshint', 'less']);

};
