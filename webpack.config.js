var webpack = require('webpack')
module.exports = {
	entry: ['webpack-hot-middleware/client?path=/__webpack_hmr','./client/index.js'],
	output: {
		path: __dirname + '/server',
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				loader: 'eslint-loader',
				enforce: 'pre',
				test: /(\.js$|\.vue$)/,
				exclude: /node_modules/
			},
			{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/
			},
			{
				loader: 'vue-loader',
				test: /\.vue$/
			},
			{
				loader: 'style-loader!css-loader',
				test: /\.css/
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'__DEV__': process.env.NODE_ENV === 'development'
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				eslint: {
					configFile: '.eslintrc'
				}
			}
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	resolve: {
		alias: {
			vue: process.env.NODE_ENV === 'development' ? 'vue/dist/vue.js' : 'vue/dist/vue.min.js'
		},
		extensions: ['*', '.js', '.vue', '.css']
	}
}