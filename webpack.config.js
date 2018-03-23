const path = require('path');

const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlPlugin = require('html-webpack-plugin');

const OfflinePlugin = require('offline-plugin');

const prod = process.env.NODE_ENV === 'prod';

const config = {
	'entry': {
		'bundle': './src/index.tsx',
		'offline': './src/offline.ts',
	},
	'output': {
		'path': path.resolve(__dirname, './assets'),
		'publicPath': '/',
		'filename': 'assets/[name].js',
	},
	'module': {
		'rules': [
			{
				'test': /\.tsx?$/,
				'use': [
					'ts-loader',
				],
			},
			{
				'test': /\.s?css$/,
				'use': ExtractTextPlugin.extract({
					'fallback': 'style-loader',
					'use': [
						'css-loader',
						'sass-loader',
					],
				}),
			},
			{
				'test': /\.(png|jpe?g|gif|svg|ico|eot|ttf|woff2?)$/,
				'loader': 'file-loader',
				'options': {
					'name': '[name].[ext]?[hash]',
				},
			},
		],
	},
	'devtool': '#source-map',
	'resolve': {
		'extensions': [
			'.ts',
			'.tsx',
			'.js',
			'.json',
		],
	},
	'plugins': [
		new webpack.DefinePlugin({
			'__dev': prod === false,
		}),
		new ExtractTextPlugin('styles.css'),
		new HtmlPlugin({
			'template': path.join(__dirname, 'src/index.html'),
		}),
		new OfflinePlugin({
			'ServiceWorker': {
				'minify': false,
			},
		}),
	],
};

if(prod) {
	config.optimization = {
		'minimize': true,
	};
}

module.exports = config;
