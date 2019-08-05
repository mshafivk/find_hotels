const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    public: path.join(__dirname, '../public')
};

module.exports = {
    context: __dirname,
    mode: 'production',
    entry: '../src/index.js',
    output: {
        path: PATHS.dist,
        filename: 'main.[chunkhash].js'
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    enforce: true,
                    chunks: 'all'
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            styles: path.resolve(__dirname, '../src/css')
        }
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'
                ]
            },
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(jpg|png)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "../public/index.html",
            filename: "./index.html"
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(PATHS.src, 'demo/static.js'),
                to: path.join(PATHS.dist, 'static.js')
            }
        ]),
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css'
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify('1.2.0'),
            DEBUG: false
        })
    ]
};