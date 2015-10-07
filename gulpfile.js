var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var ngAnnotate = require('gulp-ng-annotate');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');

var templateCache = require('gulp-angular-templatecache');

function onError(err) {
  console.log(err);
}

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 8080,
    middleware: function() {
      return [
        (function() {
          var url = require('url');
          var proxy = require('proxy-middleware');
          var options = url.parse('http://localhost:4567/');
          options.route = '/api';
          return proxy(options);
        })()
      ];
    }
  });
});

gulp.task('copyIndex', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('templates', function() {
  return gulp.src('src/javascripts/templates/**/*.html')
    .pipe(templateCache())
    .pipe(gulp.dest('src/javascripts'))
    .pipe(connect.reload());
});

gulp.task('sass', function() {
  return sass('src/stylesheets/**/*.scss')
    .on('error', sass.logError)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(concat('all.css'))

    // .pipe(csso())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/stylesheets'))
    .pipe(connect.reload());
});

gulp.task('uglify', function() {
  return gulp.src(['src/javascripts/app.js'])
    .pipe(ngAnnotate())
    .pipe(browserify({
      insertGlobals: true,
      debug: true,
    }))

    // .pipe(uglify())
    .on('error', onError)
    .pipe(gulp.dest('dist/javascripts'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['src/javascripts/**/*.js', 'src/javascripts/**/*.html'], ['templates', 'uglify']);
  gulp.watch(['src/stylesheets/**/*.scss'], ['sass']);
  gulp.watch(['src/index.html'], ['copyIndex']);
});

gulp.task('default', ['connect', 'watch', 'sass', 'templates', 'uglify', 'copyIndex']);
