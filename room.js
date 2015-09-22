// Room/Channel details

/*
- Name
- ID
- Owner
- People
- PeopleLimit (Set to 50 right now)
- Status
- Private (is private room?)
*/

// Test: ./tests/testroom.js

var utils = require('./nodejs_utils') ;

function Room(name, id, owner, private) {

	if (!utils.checkAttsForPresence(['name','id','owner'], {'name':name, 'id':id, 'owner':owner})) {
		console.log("Can't create room") ;
		return false ;
	}

	if (!utils.checkAttsType(['name','id','owner'], {'name':{'value':name , 'type':'string'}, 'id':{'value':id , 'type':'string'}, 'owner':{'value':owner , 'type':'string'}})) {
		console.log("Can't create room") ;
		return false ;
	}

	this.name = name ;
	this.id = id ;
	this.owner = owner ;
	this.people = [] ;
	this.peopleLimit = 50 ;											// Maximum number of people allowed in a room
	this.status = "available" ;										// Room availability status can be changed
	// Private room option
	this.private = (typeof private === 'undefined' || typeof private !== 'boolean') ? false : private ;
	console.log("Room created.") ;
	return true ;
};


Room.prototype.addPerson = function (personID) {

	if (!utils.checkAttsForPresence(['person_id'] , {'person_id':personID})) {
		console.log("Can't add person to the room") ;
		return false ;
	}

	if (!utils.checkAttsType(['person_id'] , {'person_id':{'value':personID , 'type':'string'}})) {
		console.log("Can't add person to the room") ;
		return false ;
	}

	if (this.status === "available" && !this.private) {
		this.people.push(personID);
		if (this.people.length === this.peopleLimit) {
			this.status = "unavailable";
		}
		return true ;
	} else {
		if (this.status !== "available") {
			console.log("This room is full") ;
			return false ;
		}
		else {
			console.log("This room is private") ;
			return false ;
		}
	}
}


Room.prototype.removePerson = function (personID) {

	if (!utils.checkAttsForPresence(['person_id'] , {'person_id':personID})) {
		console.log("Can't remove person from the room") ;
		return false ;
	}

	if (!utils.checkAttsType(['person_id'] , {'person_id':{'value':personID , 'type':'string'}})) {
		console.log("Can't remove person from the room") ;
		return false ;
	}

	var personIndex = -1 ;
	personIndex = this.people.indexOf(personID) ;
	if (personIndex !== -1) {
		this.people.splice(personIndex,1) ;
		return true ;
	}
	else {
		console.log("Could not remove person with ID : " + personID) ;
		console.log("LINE : " + __line +" ; FUNCTION : "+ __function +" ; FILE : "+ __filename) ;
		return false ;
	}

}


Room.prototype.getPerson = function (personID) {

	if (!utils.checkAttsForPresence(['person_id'] , {'person_id':personID})) {
		console.log("Can't get person details from the room") ;
		return false ;
	}

	if (!utils.checkAttsType(['person_id'] , {'person_id':{'value':personID , 'type':'string'}})) {
		console.log("Can't get person details from the room") ;
		return false ;
	}

	var person = null ;
	person = this.people[this.people.indexOf(personID)] ;
	return person ;
}


Room.prototype.isAvailable = function () {
	return this.available === "available";
}


Room.prototype.isPrivate = function () {
	return this.private;
}

module.exports = Room ;
