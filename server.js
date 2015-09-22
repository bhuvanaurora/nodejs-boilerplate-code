'use strict' ;

// Nodejs Utils
var utils = require('./nodejs_utils') ;


// Requiring dependencies
var package_ = require('./package.json') ;

var deps = {};
for (var prop in package_.dependencies) {
	deps[prop] = require(prop) ;
}


// Setting up app
var app = deps['express']() ;

app.use(deps['body-parser'].json()) ;
app.use(deps['body-parser'].urlencoded({ extended:true })) ;
app.use(deps['express-validator']()) ;

app.use('/js', deps['express'].static(__dirname));
app.engine('html', deps['ejs'].renderFile) ;


// Start server
var server = utils.startServer(app) ;

// Gracefully stop server
utils.stopServer(process) ;


app.get('/', function (req, res) {
	res.render(__dirname + '/index.html') ;
})


// Socket.io
var io =  deps['socket.io'].listen(server) ;

var existingConnections = [] ;

io.sockets.on('connection', function (socket) {
	existingConnections.push(socket) ;
	// socket.broadcast.emit('newjoin', {msg : "New connection"} ;

})
