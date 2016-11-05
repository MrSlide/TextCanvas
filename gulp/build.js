var gulp = require('gulp')
var runSequence = require('run-sequence').use(gulp)

/**
 * Run all build tasks
 */
gulp.task('build', function (cb) {
  runSequence(
    'clean',
    [
      'lintJs',
      'compileJs'
    ],
    'minifyJs',
    'notify',
    cb
  )
})
