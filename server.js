var express = require('express')
var proxy = require('http-proxy-middleware')

var app = express()

app.use(express.static('static'))
app.use('/', proxy({ target: 'https://cm.46mp.com:9999/poker.cm', changeOrigin: true, cookieDomainRewrite: '', cookiePathRewrite: '' }))
app.listen(3000)

// http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar