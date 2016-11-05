var path = require('path')
var configVars = require('./configVars.js')
var karmaConfig = {
  basePath: './',
  frameworks: ['jasmine-jquery', 'jasmine'],
  port: 9876,
  colors: true,
  autoWatch: false,
  browsers: ['PhantomJS'],
  singleRun: true,
  concurrency: 1,
  files: [
    './' + configVars['unitTests']['entryFile']
  ],
  reporters: [
    'spec',
    'coverage'
  ],
  specReporter: {
    maxLogLines: 2,
    suppressErrorSummary: false,
    suppressFailed: false,
    suppressPassed: false,
    suppressSkipped: true
  },
  coverageReporter: {
    includeAllSources: true,
    reporters: [
      {
        type: 'lcov',
        subdir: '../' + configVars['unitTests']['coverageOutputPath']
      },
      {
        type: 'text-summary'
      }
    ]
  },
  preprocessors: {},
  webpack: {
    devtool: 'inline-source-map',
    babel: {
      presets: ['es2015'],
      plugins: [
        'transform-object-assign',
        ['istanbul', {
          'exclude': [
            'tests/**/*'
          ]
        }]
      ]
    },
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          loader: 'babel'
        }
      ]
    },
    resolve: {
      root: [
        path.resolve('./src')
      ]
    }
  }
}
karmaConfig.preprocessors['./' + configVars['unitTests']['entryFile']] = ['webpack', 'sourcemap']

module.exports = function (config) {
  karmaConfig.logLevel = config.LOG_ERROR
  config.set(karmaConfig)
}
