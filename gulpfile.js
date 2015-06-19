var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var del = require('del');

var lazyWatch = function (glob, task) {
  return function () {
    var tick;
    gulp.watch(glob, function () {
      if (tick) return;
      tick = setTimeout(function () {
        runSequence(task);
        tick = void 0;
      });
    });
  };
};

gulp.task('clean', function (done) {
  del(['public/stylesheets/eleme.', '.tmp'], done);
});

gulp.task('compile.css', function (done) {
  sass('./public/sass/eleme-help.sass', {loadPath: 'css'}).pipe(concat('eleme-help.css')).pipe(gulp.dest('public/stylesheets')).on('end', done);
});

gulp.task('watch.css', lazyWatch('./public/sass/eleme-help.sass', 'compile.css'));

gulp.task('build', function (done) {
  runSequence('clean', 'compile.css', done);
});

gulp.task('dev', ['build'], function (done) {
  runSequence(['watch.css'], done);
});

gulp.task('help', function () {
  setTimeout(function () {
    console.log('');
    console.log('=========== gulp 使用说明 ===========');
    console.log(' $ gulp help    # gulp 使用说明');
    console.log(' $ gulp build   # 生成文件');
    console.log(' $ gulp dev     # 进入一般开发环境');
    console.log('=====================================');
  });
});

gulp.task('default', ['help']);

