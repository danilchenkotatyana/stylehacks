const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'production';
const SRC_DIR = __dirname + '/src';
const DIST_DIR = __dirname + '/dist';

module.exports = {
	entry: [
		SRC_DIR + '/index.jsx'
	],
	output: {
		path: DIST_DIR,
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(scss|sass|css)$/,
				exclude: /node_modules/,
				loaders: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							sourceMap: true,
							importLoaders: 1,
							localIdentName: '[local]__[hash:base64:3]'
						}
					},
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpg|jpeg|svg)$/,
				use: 'file-loader?name=[hash:base64:7].[ext]'
			},
			{
				test: /favicon\.ico$/,
				use: 'file-loader?name=[name].[ext]'
			},
			{
				test: /\.(html)$/,
				exclude: /node_modules/,
				use: {
					loader: 'html-loader',
					options: {minimize: true}
				}
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: SRC_DIR + '/index.html',
			filename: './index.html',
			favicon: 'src/favicon.png'
		}),
		new MiniCssExtractPlugin({
			filename: devMode ? '[name].css' : '[name].[hash].css',
			chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
		})
	],
	devServer: {
		contentBase: DIST_DIR,
		hot: true,
		port: 9000,
		disableHostCheck:true,
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:9001',
				secure: false,
				changeOrigin: true,
				logLevel: 'debug'
			}
		}
	}
};
