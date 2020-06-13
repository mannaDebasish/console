const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const webpack_config = {
    mode: 'development',
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../server/static'),
        library: 'EntryPoint',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            { test: /\.ts(x?)$/, loader: 'ts-loader' },
            //{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
            { test: /\.js$/, exclude: /node_module/, use: 'babel-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(pdf)$/i, loader: 'file-loader', options: { name: '[path][name].[ext]' } },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    devServer: {
        historyApiFallback: true,
        contentBase: __dirname + '/srcs/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new CopyPlugin([
            {
                from: './data/data.json',
                to: './data',
            },
        ]),
    ],
}

module.exports = webpack_config
