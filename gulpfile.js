'use strict'

var gulp = require('gulp')
var recursiveReadSync = require('recursive-readdir-sync')
var runSequence = require('run-sequence').use(gulp)
var configVars = require('./configVars.js')

/**
 * Load tasks and configuration
 */
recursiveReadSync(
  configVars['global']['gulpPath']
).filter(function (file) {
  return (/\.(js)$/i).test(file)
}).map(function (file) {
  require('./' + file)
})

/**
 * Clean the output directory, create a fresh build, and watch for changes.
 */
gulp.task('default', function (cb) {
  runSequence('clean', 'build', 'watch', cb)
})
