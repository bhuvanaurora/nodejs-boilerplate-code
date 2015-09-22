'use strict;'

var room = require('../room') ;
var utils = require('../nodejs_utils') ;
var argv = require('minimist')(process.argv.slice(2)) ;

function populateRoom () {

	var test = {'name':'name1' , 'id':'id1' , 'owner':'owner1' , 'private':true};
	var numOfTests = 4;


	for (var i=0 ; i < numOfTests ; i++) {
		console.log("Test " + (i + 1));
		var r = {};

		switch (i) {
			case 0 : r = new room(test.name, test.id, test.owner) ; break ;
			case 1 : r = new room(test.name, test.id, test.owner, "") ; break ;
			case 2 : r = new room(test.name, test.id, test.owner, " ") ; break ;
			case 3 : r = new room(test.name, test.id, test.owner, test.private) ; break ;
		}

		if (!utils.checkAttsForPresence(
			['name', 'id', 'owner'] ,
			{'name':r.name , 'id':r.id , 'owner':r.owner}
		)) {
			console.log("**** Populate room test FAILED ****") ;
		}

		if (i !== 1) {
			if (!utils.checkAttsForPresence(['private'], {'private':r.private})) {
				console.log("**** Populate room test FAILED ****") ;
			}
		}

		if (!utils.checkAttsType(
			['name', 'id', 'owner'] ,
			{'name':{'value':r.name , 'type':'string'} , 'id':{'value':r.id , 'type':'string'} , 'owner':{'value':r.owner , 'type':'string'} , 'private':{'value':r.private , 'type':'boolean'}}
		)) {
			console.log("**** Populate room test FAILED ****") ;
		}

		if (r['name'] === test['name']) console.log("Room name correct") ; else console.log("**** Room name FAILED ****") ;
		if (r['id'] === test['id']) console.log("Room id correct") ; else console.log("**** Room id FAILED ****") ;
		if (r['owner'] === test['owner']) console.log("Room owner correct") ; else console.log("**** Room owner FAILED ****") ;

		switch (i) {
			case 0 :
			case 1 :
			case 2 : if (r['private'] !== false) console.log("**** Room private test FAILED ****") ; else console.log("Room private test passed") ;
				break ;
			case 3 : if (r['private']) console.log("Room private test passed") ; else console.log("**** Room private test FAILED ****") ;
				break ;
		}
	}

} exports.populateRoom = populateRoom ;


function addPerson () {
	var r = new room('name', 'id', 'owner') ;
	r.addPerson('personid') ;
	if (r['people'][0] === 'personid') console.log("Add person test passed") ; else console.log("**** Add person test FAILED ****") ;

	if (!r.addPerson()) console.log("Add person test without attribute passed") ; else console.log("**** Add person test FAILED ****") ;

	for (var i=0 ; i<50 ; i++) {
		if (!r.addPerson('personid')) {
			if (r.people.length === r.peopleLimit) {
				console.log("People add test passed") ;
			}
			if (r.people.length > r.peopleLimit) {
				console.log("More people in the room than allowed") ;
				console.log("**** FAILED ****") ;
			}
		}
	}
} exports.addPerson = addPerson ;


function removePerson () {
	var r = new room('name', 'id', 'owner') ;
	r.addPerson('personid') ;

	if (!r.removePerson()) console.log("Remove person test without attribute passed") ; else console.log("**** Remove person test FAILED ****") ;
	if (!r.removePerson('pid')) console.log("Remove person test with wrong id passed") ; else console.log("**** Remove person test FAILED ****") ;
	if (r.removePerson('personid')) console.log("Remove person test passed") ; else console.log("**** Remove person test FAILED ****") ;
} exports.removePerson = removePerson ;


function getPerson () {
	var r = new room('name', 'id', 'owner') ;
	r.addPerson('personid') ;

	if (!r.getPerson()) console.log("Get person test without attribute passed") ; else console.log("**** Get person test FAILED ****") ;
	if (!r.getPerson('pid')) console.log("Get person test with wrong id passed") ; else console.log("**** Get person test FAILED ****") ;
	if (r.getPerson('personid') && r.getPerson('personid') === 'personid') console.log("Person details from room received. Test passed") ; else console.log("**** Get person test FAILED ****") ;
} exports.getPerson = getPerson ;


if (argv.all) {

	console.log("---- ---- Starting populate room tests ---- ----") ;
	populateRoom() ;
	console.log() ;

	console.log("---- ---- Starting add person test ---- ----") ;
	addPerson() ;
	console.log() ;

	console.log("---- ---- Starting remove person test ---- ----") ;
	removePerson() ;
	console.log() ;

	console.log("---- ---- Starting get person test ---- ----") ;
	getPerson() ;
	console.log() ;
}
