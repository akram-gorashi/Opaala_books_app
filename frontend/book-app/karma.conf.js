module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage'),
        require('@angular-devkit/build-angular/plugins/karma'),
      ],
      client: {
        clearContext: false, // Leave Jasmine Spec Runner output visible in browser
      },
      coverageReporter: {
        dir: require('path').join(__dirname, './coverage'), // Output directory
        subdir: '.',
        reporters: [
          { type: 'html' }, // Viewable in a browser
          { type: 'lcovonly' }, // Used by CI tools
          { type: 'text-summary' }, // Displays summary in terminal
        ],
        check: {
          global: {
            statements: 80, // Minimum percentage of statements that should be covered
            branches: 80,
            functions: 80,
            lines: 80,
          },
        },
      },
      reporters: ['progress', 'kjhtml', 'coverage'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'],
      singleRun: false,
      restartOnFileChange: true,
    });
  };
  