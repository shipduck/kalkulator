const path = require('path');

const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const prod = process.env.NODE_ENV === 'prod';

const config = {
	'entry': './src/index.tsx',
	'output': {
		'path': path.resolve(__dirname, '../dist/assets'),
		'publicPath': '/assets/',
		'filename': 'bundle.js',
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
	],
};

if(prod) {
	config.plugins = [
		...config.plugins,
		new webpack.optimize.UglifyJsPlugin({
			'sourceMap': true,
			'compress': {
				'warnings': false,
			},
		}),
		new webpack.LoaderOptionsPlugin({
			'minimize': true,
		}),
	];
}

module.exports = config;
