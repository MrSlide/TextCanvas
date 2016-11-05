var gulp = require('gulp')
var coveralls = require('gulp-coveralls')
var configVars = require('../configVars.js')

gulp.task('uploadCoverage', function (cb) {
  if (process.env.CI) {
    return gulp.src('./' + configVars['unitTests']['coverageOutputPath'] + 'lcov.info')
      .pipe(coveralls())
  } else {
    cb()
  }
})
