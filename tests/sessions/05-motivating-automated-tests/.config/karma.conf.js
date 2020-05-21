// karma.conf.js
module.exports = function (config) {
    config.set({
        basePath: '../',
        frameworks: ['qunit'],
        plugins: ['karma-qunit', 'karma-chrome-launcher'],

        browsers: ['Chrome'],

        client: {
            clearContext: false,
            qunit: {
                showUI: true,
                testTimeout: 5000
            }
        },

        files: [
            '../../../node_modules/jquery/dist/jquery.js',
            '../../../sessions/05-motivating-automated-tests/lib/jqreactive.js',

            '../../../sessions/05-motivating-automated-tests/app/App.js',
            '../../../sessions/05-motivating-automated-tests/app/components/**/*.js',
            

            '../../test-utils/client/*.js',
            
            './*.test.js'
        ],

        reporters: ['progress'],

        colors: true,

        singleRun: false,
        autoWatch: true

    });
};