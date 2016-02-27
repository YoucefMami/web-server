var express = require('express');
var app = express();

// variable in upper case ie it should be constant
var PORT = 3000;

var middleware = {
	requireAuthentication: function (req, res, next) {
		console.log('private route hit!');
		next();
	},
	logger: function (req, res, next) {
		
		console.log('Request made on ' + new Date().toString() + ': ' + req.method + ' ' + req.originalUrl);
		next();
	}
};

// needs to be first
//app.use(middleware.requireAuthentication);
app.use(middleware.logger);

app.get('/about', middleware.requireAuthentication, function (req, res) {
	res.send('About us!');
});

app.get('/help', function (req, res) {
	res.send('This is the help');
});

// Folder we want to expose
// Default file shown if none is specified in the browser
app.use(express.static(__dirname + '/public'));

app.listen(PORT, function () {
	console.log('Express server started on port ' + PORT);
});