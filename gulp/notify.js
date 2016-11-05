var gulp = require('gulp')
var notify = require('gulp-notify')

/**
* Notify that all tasks have been completed
*/
gulp.task('notify', function (cb) {
  if (process.env.CI) {
    cb()
  } else {
    return gulp.src('./src/', {read: false})
      .pipe(notify('Finished all tasks.'))
  }
})
