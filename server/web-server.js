var express = require( 'express' );
var app = express( );
var path = require( 'path' );

// environment
var env = process.env.NODE_ENV || 'development';
var static_dir;
if( 'development' == env ) {
	static_dir = '../client';
} else {
	static_dir = '../dist';
}
static_dir = path.normalize( __dirname + '/' + static_dir );
console.log( "Serving static files from: " + static_dir );

// logging
var logfmt = require( 'logfmt' );
app.use( logfmt.requestLogger() );

// static files
app.use( express.static( static_dir ) );

// fake data
var lists = {
	cppLunchWheel: {
		name: 'CPP Lunch Wheel',
		members: [
			{ name: 'Douglas', score: 3 },
			{ name: 'Paul', score: -1 },
			{ name: 'Anita', score: 3 },
			{ name: 'Tony', score: -2 }
		]
	},
	jedi: {
		name: 'Jedi Knights',
		members: [
			{ name: 'Luke', score: 50 },
			{  name: 'Yoda', score: -100 },
			{ name: 'Obi-Wan', score: -25 }
		]
	}
};

// api
app.get( '/api/list/:listName', function( req, res ) {
	var listName = req.params.listName;
	if( lists[ listName ] === undefined ) {
		console.log( "Requested unknown list: " + listName );
		res.status( 404 ).send( );
	}
	else {
		console.log( "Returning requested list: " + listName );
		res.status( 200 ).send( lists[listName] );
	}
} );

// server
var port = Number( process.env.PORT || 5000 );
app.listen( port, function() {
  console.log( "Express (" + env + ") is listening on port: " + port );
} );