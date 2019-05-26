var path = require('path');

module.exports = {
    entry: './src/app.js',
    devtool: 'inline-source-map',
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname),
            Pages: path.resolve(__dirname, 'src/pages/'),
            Styles: path.resolve(__dirname, 'src/styles/'),
            Components: path.resolve(__dirname, 'src/components/'),
            Images: path.resolve(__dirname, 'src/images/'),
            Utils: path.resolve(__dirname, 'src/utils/')
        }
    },
    devServer: {
        contentBase: './',
        publicPath: '/dist/',
        // for docker env
        host: '0.0.0.0',
        port: 3000,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'url-loader'
                ]
            }
        ]
    }
};