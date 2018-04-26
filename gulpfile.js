var gulp        = require('gulp'),
concat          = require('gulp-concat'),
autoprefixer    = require('autoprefixer'),
minifyCSS       = require('gulp-minify-css'),
uglify          = require('gulp-uglify'),
minimist        = require('minimist'),
path            = require('path'),
args            = require('yargs').argv,
eslint          = require('gulp-eslint'),
sass            = require('gulp-sass'),
browserSync     = require('browser-sync').create(),
fileinclude     = require('gulp-file-include'),
rename          = require('gulp-rename');

//---------------
// TASKS
//---------------

gulp.task('build', [
          'headerScripts',
          'scripts',
          'sass'
]);

var headerScripts = ['headlibs/*.js'],
    jsScripts = ['scripts/*.js', 'components/**/*.js'],
    jsDest = '',
    cssDest ='';

gulp.task('scripts', function() {
    return gulp.src(jsScripts)
        .pipe(concat('js/pagelibs.js'))
        .pipe(gulp.dest(jsDest));
});

gulp.task('headerScripts', function() {
    return gulp.src(headerScripts)
        .pipe(concat('js/headlibs.js'))
        .pipe(gulp.dest(jsDest));
});

gulp.task('sass', function(){
  return gulp.src('pagelibs.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('fileinclude', function() {
  gulp.src(['pages/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./app'));
  gulp.src(['pages/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }));
});

gulp.task('watch', ['browserSync', 'sass', 'scripts'], function(){
  gulp.watch('components/**/*.scss', ['sass']); 
  gulp.watch('styles/**/*.scss', ['sass']); 
  gulp.watch('headlibs/*.js', ['headerScripts']); 
  gulp.watch('scripts/*.js', ['scripts']); 
  gulp.watch('components/**/*.js', ['scripts']); 
  gulp.watch('components/**/*.html', ['fileinclude']); 
  gulp.watch('pages/*.html', ['fileinclude']), 
  gulp.watch('includes/*.html', ['fileinclude']) 
});

gulp.task('build', ['sass', 'scripts'], function(){
    gulp.src('pagelibs.scss')
    .pipe(sass())
    .pipe(gulp.dest(cssDest))
    gulp.src(headerScripts)
        .pipe(concat('headlibs.js'))
        .pipe(gulp.dest(jsDest));
    return gulp.src(jsScripts)
        .pipe(concat('pagelibs.js'))
        .pipe(gulp.dest(jsDest));

});

gulp.task('default', ['build']);

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
        baseDir:['app', './']
    },
  })
})


