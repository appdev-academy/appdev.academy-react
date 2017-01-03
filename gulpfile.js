var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var util = require('gulp-util');
var size = require('gulp-size')
var uglify = require('gulp-uglify')
var cleanCSS = require('gulp-clean-css');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');

// No matter what URL query - serve ./index.html
var historyApiFallback = require('connect-history-api-fallback')

// Init JS bundler
var bundler = watchify(browserify('src/js/app.js', watchify.args));
// Use ES6, React, Object rest spread (3 dots syntax)
bundler.transform(babelify, {
  presets: ["es2015", "react", "stage-1"],
  plugins: ["transform-decorators-legacy", "transform-object-rest-spread"]
})

function bundle() {
  return bundler.bundle()
    .on('error', util.log.bind(util, 'Browserify Error'))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(size())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream({ once: true }));
}

function minBundle() {
  process.env.NODE_ENV = 'production';
  browserify('src/js/app.js')
    .transform(babelify, {
      presets: ["es2015", "react", "stage-1"],
      plugins: ["transform-decorators-legacy", "transform-object-rest-spread"]
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(size({ title: 'JS before uglify' }))
    .pipe(uglify())
    .pipe(size({ title: 'JS after uglify' }))
    .pipe(gulp.dest('dist'));
  }

// Rebundle JS for development (fast, big file)
gulp.task('js', bundle);

// Rebundle JS for production (slow, small file)
gulp.task('min-js', minBundle);

// Rebuild SASS for development
gulp.task('sass', function() {
  gulp.src('src/css/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// Rebuild SASS for production
gulp.task('min-sass', function() {
  gulp.src('src/css/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(size({ title: 'SASS before cleanCSS' }))
    .pipe(cleanCSS())
    .pipe(size({ title: 'SASS after cleanCSS' }))
    .pipe(gulp.dest('dist'));
});

// Copy HTML files (single index.html) to dist folder
gulp.task('copy-html', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream({ once: true }));
});

// Copy constants depending on environment
gulp.task('copy-constants-development', function() {
  gulp.src('src/js/constants-development.js')
    .pipe(rename({ basename: 'constants'}))
    .pipe(gulp.dest('src/js'));
});
gulp.task('copy-constants-production', function() {
  gulp.src('src/js/constants-production.js')
    .pipe(rename({ basename: 'constants'}))
    .pipe(gulp.dest('src/js'));
});

gulp.task('default', ['copy-constants-development', 'js', 'sass', 'copy-html'], function() {
  browserSync({
    server: {
      baseDir: 'dist',
      middleware: [ historyApiFallback() ]
    },
    browser: 'google chrome'
  });
  gulp.watch('src/js/**/*.*', ['js']);
  gulp.watch('src/css/**/*.*', ['sass']);
  gulp.watch('src/index.html', ['copy-html']);
});

gulp.task('build', ['copy-constants-production', 'min-js', 'min-sass', 'copy-html'], function() {});