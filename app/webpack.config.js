// module.exports = {
//     module: {
//         rules: [
//             {
//                 test: /\.(js|jsx)$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: "babel-loader"
//                 }
//             },
//             {
//                 test: /\.(s*)css$/,
//                 use: ['style-loader', 'css-loader', 'sass-loader']
//             },
//             {
//                 test: /\.html$/,
//                 use: [
//                     {
//                         loader: "html-loader"
//                     }
//                 ]
//             }
//         ]
//     },
//     plugins: [
//         new HtmlWebPackPlugin({
//             template: "./src/index.html",
//             filename: "./index.html"
//         })
//     ]
// };

const TARGET = process.env.npm_lifecycle_event;

if (TARGET === 'build:dev' || TARGET === 'dev' || !TARGET) {
    module.exports = require('./config/webpack.config.dev');
    console.info('--> ./config/webpack.config.dev.js');
}
else if (TARGET === 'build') {
    module.exports = require('./config/webpack.config.prod');
    console.info('--> ./config/webpack.config.prod.js');
}