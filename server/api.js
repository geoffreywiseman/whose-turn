var express = require( 'express' );
var app = express( );

// logging
var logfmt = require( 'logfmt' );
app.use( logfmt.requestLogger() );

// static files
app.use( express.static(__dirname + '/dist' ) );

// fake data
var lists = {
	cppLunchWheel: [
		{ name: 'Douglas', score: 3 },
		{ name: 'Paul', score: -1 },
		{ name: 'Anita', score: 3 },
		{ name: 'Tony', score: -2
		}
	],
	jedi: [
		{ name: 'Luke', score: 50 },
		{  name: 'Yoda', score: -100 },
		{ name: 'Obi-Wan', score: -25 }
	]
};

// api
app.get( '/api/list/:listName', function( req, res ) {
	var listName = req.params.listName;
	console.log( "Requested List: " + listName );
	if( lists[ listName ] === undefined )
		res.send( 404, { error: 'list.missing', message: "Can't find a list matching that name." } );
	else
		res.send( 200, lists[ listName ] );
} );

// server
var port = Number( process.env.PORT || 5000 );
app.listen( port, function() {
  console.log( "Express is listening on port: " + port );
} );