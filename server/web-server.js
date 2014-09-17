"use strict";

// dependencies
var express = require( 'express' );
var app = express( );
var path = require( 'path' );
var mongo = require( 'mongodb' );

// globals
var env = process.env.NODE_ENV || 'development';
var db;

//  setup
function setupStaticFiles( ) {
	var static_dir;
	if( 'development' == env ) {
		static_dir = '../client';
	} else {
		static_dir = '../dist';
	}
	static_dir = path.normalize( __dirname + '/' + static_dir );
	console.log( "Serving static files from: " + static_dir );
	app.use( express.static( static_dir ) );
}

function setupLogging() {
	var logfmt = require( 'logfmt' );
	app.use( logfmt.requestLogger() );
}

setupLogging();
setupStaticFiles();

// startup
function startup() {
	var port = Number( process.env.PORT || 5000 );
	var mongoUrl = process.env.MONGOHQ_URL;

	if( !mongoUrl ) {
		throw "No persistent datastore";
	}

	mongo.MongoClient.connect( mongoUrl, function( err, connection ) {
		if( err ) {
			console.log( "Couldn't connect to MongoDB." );
			throw err;
		} else {
			db = connection;
			console.log( "Connection established to MongoDB." );
			app.listen( port, function() {
  				console.log( "Express (" + env + ") is listening on port: " + port );
			} );
		}
	} );			
}

// api
app.get( '/api/lists', function( req, res ) {
	console.log( "Retrieving all lists." );
	db.collection( 'lists', { strict: true }, function( err, collection ) {
		if( err ) {
			console.log( "No 'lists' collection in datastore." );
			console.dir( err );
			res.status( 500 ).send( "Could not retrieve lists from persistent datastore." );
		} else {
			collection.find( {}, { _id: 1, name: 1 } ).toArray( function( err, listOfLists ) {
				if( err ) {
					console.error( "Could not retrieve list of lists." );
					console.dir( err );
				} else {
					console.log( "Returning list of lists." );
					res.status( 200 ).send( listOfLists );
				}
			} );
		}
	} );
} );

app.get( '/api/lists/:listId', function( req, res ) {
	var listId = req.params.listId;
	console.log( "Attempting to retrieve list for id: " + listId );
	db.collection( 'lists', { strict: true }, function( err, lists ) {
		if( err ) {
			console.log( "Couldn't find 'lists' collection." );
			console.dir( err );
			res.status( 500 ).send( "Couldn't retrieve lists from persistent datastore." );
		} else {
			lists.findOne( { "_id": mongo.ObjectID( listId ) }, function( err, list ) {
				if( err ) {
					console.log( "Couldn't retrieve list:" );
					console.dir( err );
					res.status( 500 ).send( "Couldn't retrieve list." );
				} else {
					if( list ) {
						console.log( "Returning requested list: " + listId );
						res.status( 200 ).send( list );
					} else {
						console.log( "Requested unknown list: " + listId );
						res.status( 404 ).send( );
					}
				}
			} );
		}
	} );
} );


startup();