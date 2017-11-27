const webpack = require('webpack')

module.exports = {
    entry: {
        base: ['./index.js'],
        main: ['./main/index.js'],
        // auth: ['./app/auth/index.js'],
        // hotMiddware: 'webpack-hot-middleware/client?reload=true'
    },
    devServer: {
        disableHostCheck: true
    },
    devtool: 'eval',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /(node_modules)/,
            options: {
                presets: ['es2015', 'react', 'stage-1'],
                compact: false,
                plugins: [
                    'transform-es2015-arrow-functions',
                    'transform-decorators-legacy',
                    'check-es2015-constants',
                    'transform-es2015-block-scoping',
                    ['babel-plugin-root-import', {
                        'rootPathPrefix': "@",
                        'rootPathSuffix': 'static/asset'
                    }]
                ]
            },
        }],
    },
    resolve: {
        extensions: ['.jsx']
    },
    externals: [{
        fs: true,
    }],
    plugins: []
}
