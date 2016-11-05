var gulp = require('gulp')
var rollup = require('rollup')
var babel = require('rollup-plugin-babel')
var configVars = require('../configVars.js')

var cache
/**
 * Transpile and minify source JavaScript code using Webpack and Babel
 */
gulp.task('compileJs', function (cb) {
  rollup.rollup({
    entry: './' + configVars['js']['srcPath'] + configVars['js']['entryFile'],
    cache: cache,
    plugins: [
      babel({
        presets: [
          ['es2015', {modules: false}]
        ],
        plugins: [
          'transform-object-assign'
        ],
        exclude: 'node_modules/**',
        runtimeHelpers: true,
        comments: false
      })
    ]
  }).then(function (bundle) {
    cache = bundle

    return bundle.write({
      dest: './' + configVars['global']['outputPath'] + configVars['js']['outputPath'] + configVars['js']['outputFile'],
      format: 'umd',
      moduleName: configVars['js']['libraryName'],
      sourceMap: true
    })
  }).then(function () {
    cb()
  }, function (err) {
    console.error(err)
    process.exit(1)
  })
})
