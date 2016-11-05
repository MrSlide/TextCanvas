var gulp = require('gulp')
var fs = require('fs-extra')
var path = require('path')
var configVars = require('../configVars.js')

function cleanDir (dirPath, whitelist) {
  try {
    var dirContents = fs.readdirSync(dirPath)
    var currentPath
    var cleanPath
    var pathStats

    for (var i = 0; i < dirContents.length; i++) {
      currentPath = path.join(dirPath, dirContents[i])
      cleanPath = true

      for (var j = 0; j < whitelist.length; j++) {
        if (whitelist[j].indexOf(currentPath) === 0) {
          cleanPath = false
          break
        }
      }

      if (cleanPath) {
        try {
          fs.removeSync(currentPath)
        } catch (err) {
          console.error(err)
        }
      } else {
        try {
          pathStats = fs.statSync(currentPath)
          if (pathStats.isDirectory()) {
            cleanDir(currentPath, whitelist)
          }
        } catch (err) {
          console.error(err)
        }
      }
    }
  } catch (err) {
    return
  }
}

/**
 * Clean up the output directory
 */
gulp.task('clean', function (cb) {
  var basePath = path.join(__dirname, '../', configVars['global']['outputPath'])
  var relativeWhitelist = configVars['global']['cleanWhitelist']
  var pathWhitelist = []

  for (var i = 0; i < relativeWhitelist.length; i++) {
    pathWhitelist.push(path.join(basePath, relativeWhitelist[i]))
  }

  cleanDir(basePath, pathWhitelist)

  cb()
})
