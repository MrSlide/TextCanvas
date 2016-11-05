var gulp = require('gulp')
var runSequence = require('run-sequence').use(gulp)

/**
 * Run all test tasks
 */
gulp.task('test', function (cb) {
  runSequence(
    'testUnits',
    'uploadCoverage',
    cb
  )
})
