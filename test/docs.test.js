var should = require( "should" ),
  scdata = require( ".." );

describe( "DataService", function () {

  it( "A data service (currently extended by `itemservicejs` and `entityservicejs`)", function () {

    var data = new scdata( {
      url: "/api/people"
    } );

    data.get().parameter( "name", "max" ).execute().then( function ( max ) {
      max.name.should.equal( "max" );
    } );

  } );

} );