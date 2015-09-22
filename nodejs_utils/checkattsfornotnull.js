exports.checkAttsForNotNull = function(atts, values) {
	for (var i=0 ; i<atts.length ; i++) {
		if (values[atts[i]] === null) {
			console.log(atts[i] + " null") ;
			return false ;
		}
	}
	return true ;
}
