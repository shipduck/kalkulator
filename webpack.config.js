const path = require('path');

const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

const assetsPrefix = 'assets';

const config = {
	'entry': './src/index.tsx',
	'output': {
		'path': path.resolve(__dirname, 'app'),
		'publicPath': '/',
		'filename': `${assetsPrefix}/bundle.js`,
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
					'name': `${assetsPrefix}/[name].[ext]?[hash]`,
				},
			},
			{
				'test': /\.(html)$/,
				'loader': 'file-loader',
				'options': {
					'name': '[name].[ext]',
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
		new ExtractTextPlugin(`${assetsPrefix}/styles.css`),
	],
	'devServer': {
		'contentBase': './app',
		'https': true,
		'host': '0.0.0.0',
		'port': 8112,
		'inline': false,
	},
};

if(prod) {
	config.optimization = {
		'minimize': true,
	};
}

module.exports = config;
