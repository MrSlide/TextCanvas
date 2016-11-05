var gulp = require('gulp')
var runSequence = require('run-sequence').use(gulp)

/**
 * Run all release tasks
 */
gulp.task('release', function (cb) {
  runSequence(
    'clean',
    [
      'lintJs',
      'compileJs'
    ],
    'minifyJs',
    'test',
    'notify',
    cb
  )
})
