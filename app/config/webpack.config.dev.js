const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    public: path.join(__dirname, '../public'),
};

module.exports = {
    context: __dirname,
    mode: 'development',
    entry: '../src/index.js',
    output: {
        path: PATHS.dist,
        filename: 'main.js',
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
        extensions: ['.js', '.jsx']
    },
    devtool: 'eval-sourcemap',
    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(s*)css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [require('autoprefixer')({
                            'browsers': ['> 1%', 'last 2 versions']
                        })],
                    }
                }, { loader: 'sass-loader' }
                ]
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
    ],
    devServer: {
        contentBase: PATHS.dist,
        compress: true,
        headers: {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY'
        },
        open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        port: 8080,
        publicPath: 'http://localhost:8080/',
        hot: true
    },
    stats: {
        children: false
    }
};