// server.js

var express = require('express'),
path = require('path'),
app = express(),
port = process.env.PORT || 8080,
bodyParser = require('body-parser'),
basicAuth = require('basic-auth'),
compression = require('compression'),
config = require('./config');

// Make sure to include the JSX transpiler
require('node-jsx').install();
app.use(compression());

// Include static assets. Not advised for production
app.use(express.static(path.join(__dirname, 'dist')));
// Set view path
app.set('views', path.join(__dirname, 'dist'));
// set up ejs for templating. You can use whatever
app.set('view engine', 'ejs');

// Set up Routes for the application
//require('./app/routes/core-routes.js')(app);

app.get('/', function(req, res){
  // React.renderToString takes your component
  // and generates the markup
  var reactHtml = React.renderToString(ReactApp({}));
  // Output html rendered by react
  // console.log(myAppHtml);
  res.render('index.html', {reactOutput: reactHtml});
});

//Route not found -- Set 404
app.get('*', function(req, res) {
  res.json({
    'route': 'Sorry this page does not exist!'
  });
});

app.listen(port);
console.log('Server is Up and Running at Port : ' + port);
