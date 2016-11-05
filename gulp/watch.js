var gulp = require('gulp')
var watch = require('gulp-watch')
var runSequence = require('run-sequence').use(gulp)
var configVars = require('../configVars.js')

/**
* Run an initial build and watch for changes and update files as necessary
*/
gulp.task('watch', function (cb) {
  /**
  * Watch for JS changes
  */
  watch(
    configVars['js']['srcPath'] + configVars['js']['fileGlob'],
    function () {
      runSequence(
        [
          'lintJs',
          'compileJs'
        ],
        'minifyJs',
        'notify'
      )
    }
  )

  cb()
})
