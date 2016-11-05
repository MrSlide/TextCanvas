var gulp = require('gulp')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')
var rename = require('gulp-rename')
var configVars = require('../configVars.js')

/**
 * Transpile and minify source JavaScript code using Webpack and Babel
 */
gulp.task('minifyJs', function () {
  return gulp.src('./' + configVars['global']['outputPath'] + configVars['js']['outputPath'] + configVars['js']['outputFile'])
    .pipe(sourcemaps.init())
    .pipe(uglify({
      mangle: true,
      preserveComments: 'license',
      drop_console: true,
      outSourceMap: false,
      compress: {
        global_defs: {
          DEBUG: false
        }
      }
    }))
    .pipe(rename(function (path) {
      path.basename += '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./' + configVars['global']['outputPath'] + configVars['js']['outputPath']))
})
