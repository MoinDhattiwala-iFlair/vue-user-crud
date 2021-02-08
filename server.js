var express = require('express')
var serveStatic = require('serve-static')
var path = require("path")
const history = require('connect-history-api-fallback');

const app = express()

app.use('/', serveStatic(path.join(__dirname, '/dist')))

app.use(history({
    disableDotRule: true,
    verbose: true
}));

app.use('/', serveStatic(path.join(__dirname, '/dist')))

app.get('/', function (req, res) {
    res.render(path.join(__dirname + '/dist/index.html'));
});

const port = process.env.PORT || 8080

app.listen(port)

console.log('Listening on port ' + port);