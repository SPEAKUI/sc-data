var express = require( 'express' ),
  app = express(),
  _ = require( "underscore" ),
  dummy = require( "./test/dummy" );

app.use( express.json() );
app.use( express.urlencoded() );
app.use( express.logger( "dev" ) );
app.use( app.router );
app.use( express.static( __dirname ) );

app.get( "/api/people", function ( req, res ) {
  res.json( _.findWhere( dummy.data.people, {
    name: req.param( "name" )
  } ) );
} );

app.put( "/api/people", function ( req, res ) {
  res.json( _.findWhere( dummy.data.people, {
    name: req.param( "name" )
  } ) );
} );

app.post( "/api/people", function ( req, res ) {
  res.json( _.findWhere( dummy.data.people, {
    name: req.param( "name" )
  } ) );
} );

app.delete( "/api/people", function ( req, res ) {
  res.json( _.findWhere( dummy.data.people, {
    name: req.param( "name" )
  } ) );
} );

app.listen( 3000 );