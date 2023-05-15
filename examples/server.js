const express = require('express')
const webpack = require("webpack")
const bodyParser = require('body-parser')
const webpackConfig = require('./webpack.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const e = require('express')

const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

router.get('/simple/get', function (req, res) {
  res.end({
    msg: 'Hello World'
  })
})

router.get('/base/get', function (req, res) {
  res.json(req.query)
})

router.post('/base/post', function (req, res) {
  res.json(req.body)
})

router.post('/base/buffer', function (req, res) {
  let msg = []
  req.on('data', (chunk) => {
    if (chunk) {
      msg.push(chunk)
    }
  })

  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})

router.get('/error/get', function (req, res) {
  if (Math.random() > 0.5) {
    res.json({
      msg: 'Hello world'
    })
  } else {
    res.status(500)
    res.end()
  }
})

router.get('/error/timeout', function (req, res) {
  setTimeout(() => {
    res.json({
      msg: 'Hello World'
    })
  }, 3000)
})

app.use(router)

module.exports = app.listen(8081, () => {
  console.log('Server listening on http://localhost:8081')
})