/**
 * Configuration values
 */
module.exports = {
  global: {
    gulpPath: 'gulp/',
    outputPath: 'build/',
    cleanWhitelist: ['index.html']
  },
  js: {
    fileGlob: '**/*.js',
    testFileGlob: '**/*.spec.js',
    srcPath: 'src/',
    entryFile: 'text-canvas.js',
    libraryName: 'TextCanvas',
    outputPath: '',
    outputFile: 'text-canvas.js',
    outputMinFile: 'text-canvas.min.js'
  },
  unitTests: {
    karmaConfigFile: 'karma.conf.js',
    entryFile: 'tests/unit-tests.js',
    coverageOutputPath: 'tests/'
  }
}
