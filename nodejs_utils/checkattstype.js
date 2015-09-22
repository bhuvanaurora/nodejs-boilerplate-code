exports.checkAttsType = function(atts, values) {
	for (var i=0 ; i<atts.length ; i++) {
		var attType = typeof values[atts[i]]['value'] ;
		var reqAttType = values[atts[i]]['type'] ;
		if (attType !== reqAttType) {
			console.log(atts[i] + " should be of type " + reqAttType + ", but is of type " + attType) ;
			return false ;
		}
	}
	return true ;
}
