module.exports = function (process, message) {

	process.stdin.resume() ; // so the program will not close instantly

	function exitHandler(options, err) {
		if (err) console.log(err.stack) ;
	    if (options.cleanup) {
	    	if (message) console.log(message) ;
	    	console.log('Clean exit, goodbye...\n') ;
	    }

	    if (options.exit) process.exit() ;
	}

	//do something when app is closing
	process.on('exit', exitHandler.bind(null, {cleanup:true})) ;

	//catches CTRL+C event
	process.on('SIGINT', exitHandler.bind(null, {exit:true})) ;

	process.on('SIGHUP', exitHandler.bind(null, {exit:true})) ;
	process.on('SIGQUIT', exitHandler.bind(null, {exit:true})) ;
	process.on('SIGABRT', exitHandler.bind(null, {exit:true})) ;
	process.on('SIGTERM', exitHandler.bind(null, {exit:true})) ;

	//catches uncaught exceptions
	process.on('uncaughtException', exitHandler.bind(null, {exit:true})) ;

}
