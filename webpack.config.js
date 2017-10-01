var webpack = require('webpack')
var path = require('path')

var ety = ['./client/index.js']
var pgs = [
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
	new webpack.ProvidePlugin({
		$: "jquery",
		jQuery: "jquery",
		Popper: 'popper.js'
	})
]
if (process.env.NODE_ENV === 'development') {
	ety.unshift('webpack-hot-middleware/client?path=/__webpack_hmr')
	pgs.push(new webpack.HotModuleReplacementPlugin())
}
module.exports = {
	entry: ety,
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
				include: [
					path.resolve(__dirname, 'client'),
					path.resolve(__dirname,'node_modules/vuejs-storage')
				]
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
	plugins: pgs,
	resolve: {
		alias: {
			vue: process.env.NODE_ENV === 'development' ? 'vue/dist/vue.js' : 'vue/dist/vue.min.js'
		},
		extensions: ['*', '.js', '.vue', '.css']
	}
}