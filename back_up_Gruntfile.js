module.exports = function(grunt){
	// 构建配置任务
	grunt.initConfig({
		//读取package.json的内容，形成个json数据
   		pkg: grunt.file.readJSON('package.json'),

		// 复制
		copy: {
			// 指定子任务，调用可以是grunt copy(执行copy里面的全部任务)，grunt copy:build(执行copy里面的build任务)
			build: {
				cwd: 'js',      //指向的目录是相对的,全称Change Working Directory更改工作目录
				src: ['**'],    //指向源文件，**是一个通配符，用来匹配Grunt任何文件
				dest: 'images', //用来输出结果任务
				expand: true	//expand参数为true来启用动态扩展，涉及到多个文件处理需要开启
			},
			// 注：如果src: [ '**', '!**/*.styl' ]，表示除去.styl文件，！在文件路径的开始处可以防止Grunt的匹配模式
		},

		// 清除
		clean: {
			build: {
				src: ['css/**/*.*']
			},
		},

		less: {
			dynamic_mappings: {
				files: [{
		            expand: true,     // Enable dynamic expansion.
		            cwd: 'build/less',      // Src matches are relative to this path.
		            src: ['**/*.less', '!**/header.less', '!**/sidebar.less', '!**/footer.less', '!**/reset.less', '!**/layout.less', '!**/nprogress.less', '!**/post.less', '!**/single.less'], // Actual pattern(s) to match.
		            dest: 'css',   // Destination path prefix.
		            ext: '.css',   // Dest filepaths will have this extension.
		        }],
		    },
		},

		// CSS压缩
		cssmin: {
		  	build: {
		  		expand: true,
			    cwd: 'css/',
			    src: ['*.css', '!*.min.css'],
			    dest: 'css/',
			    ext: '.css'
		  	}
		},

		// 压缩js
		uglify: {
			// 基本压缩（用于不常修改的文件）
		  	build: {
			   files: [{
		          expand: true,
		          cwd: 'build/js',
		          src: ['*.js', '!**/component.js', '!**/jquery.js', '!**/html5.js'],
		          dest: 'js/'
		      }],
		  	},
		  	// public（常修改维护的文件）
		  	publicJs: {
			  files: {
		        'js/public.js': ['build/js/public.js']
		      }
		  	},
		  	// 组件压缩（组件级别，一般仅压缩一次）
		  	component: {
		    	options: {
		      		mangle: false  // false表示关闭短命名方式压缩。如果文件要共享到另一个项目中，会带来问题，因为名称已改变
		    	},
			    files: {
			      	'js/component.js': [ 'build/js/component/piano_storage.js']
			    },
			},
		},

		// JS语法检查
		jshint: {
		    all: ['js/*.js'],
		},

		// 监听(监测到文件改变时执行对应任务)
		watch: {
		  	stylesheets: {
		    	files: 'build/less/*.less',
		    	tasks: [ 'stylesheets' ]
		  	},
		  	publicJs: {
		    	files: 'build/js/public.js',
		    	tasks: [ 'uglify:publicJs' ],
		  	},
		  	scripts: {
		  		files: ['build/js/*.js', '!build/js/**/public.js' ],
		    	tasks: [ 'uglify:build' ],
		  	},
		  	componentJS: {
		  		files: ['build/js/component/*.js'],
		    	tasks: [ 'uglify:component' ],
		  	}
		},

	// initConfig结尾
	});

	// 加载任务-分开加载
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-cssmin");

	// 把grunt-contrib插件全部一次性加载
	// grunt.loadNpmTasks('grunt-contrib');

	// grunt.event.on('watch', function(action, filepath) {
	//   	grunt.config(['uglify', 'build'], filepath);
	// });
	grunt.event.on('watch', function(action, filepath) {
	  grunt.config(['jshint', 'all'], filepath);
	});

	// 自定义任务
	// 作用：将以上众多子任务和在一起，便于手工运行或定义watch的任务

	// 处理CSS
	grunt.registerTask(
	  	'stylesheets',
	  	'Compiles the stylesheets.',
	  	// [ 'less' ]
	  	[ 'less', 'cssmin' ]
	);
	// 处理JS
	grunt.registerTask(
	  	'scripts',
	  	'Compiles the JavaScript files.',
	  	[ 'uglify:publicJs' ]
	);
	// 处理public
	grunt.registerTask(
	  	'publicJs',
	  	'Compiles the JavaScript files.',
	  	[ 'uglify:publicJs' ]
	);
	// componentJS
	grunt.registerTask(
	  	'componentJS',
	  	'Compiles the JavaScript files.',
	  	[ 'uglify:componentJS' ]
	);

	// 创建工程
	grunt.registerTask(
	  	'build',    //任务名称
	  	'Compiles all of the assets and copies the files to the build directory.',   //任务描述
	  	[ 'clean', 'copy', 'stylesheets', 'scripts', 'jade' ]    //将要运行的任务数组，按顺序执行
	);

	// 默认工程
	grunt.registerTask(
	  	'default',
	  	'Watches the project for changes, automatically builds them and runs a server.',
	  	[ 'build', 'connect', 'watch' ]
	);
	// default任务运行build创建一个初始的build，然后它开始连接服务器，最后它会运行watch，监测文件变化和重新构建。
	// 因为watch一直在运行，所以服务器一直在运行。在你的控制台上运行grunt，然后到http://localhost:4000查看你的项目。

//modules结尾
};
