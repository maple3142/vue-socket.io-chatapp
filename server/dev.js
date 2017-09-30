const webpack = require('webpack')
const wpconfig = require('../webpack.config.js')
const compiler = webpack(wpconfig)
module.exports = app => {
	app.use(require("webpack-dev-middleware")(compiler, {
		publicPath: wpconfig.output.publicPath,
		watchOptions: {
			aggregateTimeout: 300,
			poll: true
		},
		noInfo: true
	}))
	app.use(require("webpack-hot-middleware")(compiler, {
		path: '/__webpack_hmr'
	}))
}