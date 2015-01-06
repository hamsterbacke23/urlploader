var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  mocha = require('gulp-mocha'),
  watch = require('gulp-watch');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}


gulp.task('develop', function () {
  nodemon({
      script: 'urlploader.js',
      ext: 'html js',
      ignore: []})
    .on('restart', function () {
      console.log('restarted!');
    });
});

gulp.task('test', function () {
    return gulp.src('test/compareTest.js')
        .pipe(mocha({reporter: 'list'})
        .on("error", handleError));
});

gulp.task("watch", function () {
  gulp.watch(['*.js', 'test/**/*.json', 'test/**/*.js'], ["test"]);
});

