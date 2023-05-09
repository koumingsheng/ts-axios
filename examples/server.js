const express = require('express')
const webpack = require("webpack")
const webpackConfig = require('webpack.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const app = express()
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  colors: true
}))

app.use(webpackHotMiddleware(compiler))

module.exports = app.listen(8080, () => {
  console.log('Server listening on http://localhost:8080')
})