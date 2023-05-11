const express = require('express')
const webpack = require("webpack")
const bodyParser = require('body-parser')
const webpackConfig = require('./webpack.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

router.get('/simple/get', function (req, res) {
  res.end({
    msg: 'Hello World'
  })
})

app.use(router)

module.exports = app.listen(8081, () => {
  console.log('Server listening on http://localhost:8080')
})