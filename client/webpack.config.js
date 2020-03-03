const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

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
					options: { minimize: true }
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
			favicon: 'src/favicon.png',
			minify: devMode ? false : true
		}),
		new FaviconsWebpackPlugin({
			logo: SRC_DIR + '/img/logo.svg'
		}),
		new MiniCssExtractPlugin({
			filename: devMode ? '[name].css' : '[name].[hash].css',
			chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
		}),
		new CompressionPlugin(),
		new ManifestPlugin({
			fileName: 'manifest.json',
			seed: {
				"name": "stylehacks",
				"short_name": "stylehacks",
				"theme_color": "#FAF7F4",
				"background_color": "#CEC6C3",
				"display": "minimal-ui",
				"start_url": devMode ? "/" : "https://stylehacks.ai/",
				"icons": [{
					"src": "/assets/apple-touch-icon-180x180.png",
					"type": "image/png",
					"sizes": "180x180"
				}, {
					"src": "/assets/apple-touch-icon-1024x1024.png",
					"type": "image/png"
				}]
			},
			writeToFileEmit: true
		})
	],
	devServer: {
		contentBase: DIST_DIR,
		hot: true,
		port: 9000,
		disableHostCheck: true,
		historyApiFallback: true,
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
