var gulp = require('gulp'),
    nunjucksRender = require('gulp-nunjucks-render'),
    flatten = require('gulp-flatten'),
    sass = require('gulp-sass'),
    webpackStream = require('webpack-stream'),
    webpack = require('webpack'),
    autoprefixer = require('gulp-autoprefixer'),
   	browserSync = require('browser-sync').create();


// Production
var uglify = require('gulp-uglify'),
    pump = require('pump'),
    cleanCSS = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin');


///// Assemble all nunjucks partials  //////
gulp.task('assembleNunjucksPartials', () => {
  return gulp.src(['src/**/*.html'])
    .pipe(flatten())
    .pipe(gulp.dest('.tmp/partials'))
});


///// Compile Nunjucks /////
gulp.task('compileNunjucks', ['assembleNunjucksPartials'], function () {
  return gulp.src('./src/index.html')
    .pipe(nunjucksRender({path: ['.tmp/partials']}))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


///// Compile Sass /////
gulp.task('compileSass', function () {
  return gulp.src('src/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets_builded/styles'))
    .pipe(browserSync.reload({
	    stream: true
	  }));
});


/// Compile JS /////
gulp.task('compileJS', function() {
    return gulp.src('src/index.js')
    .pipe(webpackStream({
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          }
        ],
      },
      output: {
        filename: 'index.js',
      }
    }, webpack))
    .pipe(gulp.dest('assets_builded/scripts'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


///// Live reload //////
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    open: false
  });
});


///// Minify JS /////
gulp.task('MinifyJS', function (cb) {
  pump([
        gulp.src('assets_builded/scripts/index.js'),
        uglify(),
        gulp.dest('assets_builded/scripts')
    ],
    cb
  );
});


///// Set prefixes /////
gulp.task('setPrefixes', function () {
  return gulp.src('assets_builded/styles/index.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('assets_builded/styles'));
});


///// Minify CSS /////
gulp.task('minifyCSS', ['setPrefixes'], function () {
  return gulp.src('assets_builded/styles/index.css')
    .pipe(cleanCSS({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(gulp.dest('assets_builded/styles'));
});


///// Minify HTML /////
gulp.task('minifyHTML', function() {
  return gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./'));
});


///// Watch /////
gulp.task('default', [
                      'browserSync',
                      'compileSass',
                      'compileJS',
                      'compileNunjucks'
                      ],
  function() {
  	gulp.watch(['src/**/*.scss', 'src/index.scss'], ['compileSass']);
    gulp.watch(['src/**/*.js', 'src/index.js'], ['compileJS']);
    gulp.watch(['src/index.html', 'src/**/*.html'], ['compileNunjucks']);
});


///// Production /////

gulp.task('prod', ['MinifyJS', 'setPrefixes', 'minifyCSS', 'minifyHTML']);