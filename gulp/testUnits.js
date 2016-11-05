var gulp = require('gulp')
var path = require('path')
var KarmaServer = require('karma').Server
var configVars = require('../configVars.js')

gulp.task('testUnits', function (cb) {
  var config = {
    configFile: path.join(__dirname, '../' + configVars['unitTests']['karmaConfigFile'])
  }
  new KarmaServer(config, function (exitCode) {
    if (exitCode) {
      process.exit(exitCode)
    }
    cb()
  }).start()
})
