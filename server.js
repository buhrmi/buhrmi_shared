var express = require('express')
var proxy = require('http-proxy-middleware')

var app = express()

// serve files from static folder
app.use(express.static('static'))

// if its not in static folder, proxy everything to 46mp.com
app.use('/', proxy({ target: 'https://cm.46mp.com:9999/poker.cm', changeOrigin: true, cookieDomainRewrite: '', cookiePathRewrite: '' }))

app.listen(3000)
