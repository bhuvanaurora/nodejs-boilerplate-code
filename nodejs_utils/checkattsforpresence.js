exports.checkAttsForPresence = function(atts, values) {
	for (var i=0 ; i<atts.length ; i++) {
		if (typeof values[atts[i]] === 'undefined') {
			console.log(atts[i] + " not present.") ;
			return false ;
		}
	}
	return true ;
}
