module.exports = function (app) {
	const PORT = process.env.PORT || 2428 ;

	// Start server
	return app.listen(PORT, function (err) {
		if (err) return console.log(err, err.stack.split('\n')) ;
		console.log("Web server started at port: " + PORT) ;
	}) ;
}
