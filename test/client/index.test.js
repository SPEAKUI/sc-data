describe( "scdata", function () {

  it( "should exist", function () {
    scdata.should.have.a.properties( [ "config", "extend", "Query", "Item" ] );
  } );

  it( "should be emittable", function () {
    new scdata().should.have.a.property( "emit" );
  } );

  it( "should santize properties", function () {
    var data = new scdata();
    data.should.have.property( "options", {} );
    data.should.have.property( "url", "" );
    data.should.have.property( "type", "GET" );
  } );

  describe( "scdata.Item", function () {

    it( "should exist", function () {
      scdata.Item.should.have.properties( [ "extend" ] );
    } );

    it( "should exist", function () {
      new scdata.Item().should.have.properties( [ "json" ] );
    } );

    it( "should be emittable", function () {
      new scdata.Item().should.have.a.property( "emit" );
    } );

  } );

  describe( "basic CRUD", function () {

    var personService = new scdata( {
      url: "http://localhost:3000/api/people"
    } );

    it( "should get", function ( _done ) {

      personService.get().parameter( "name", "max" ).execute().then( function ( max ) {
        max.name.should.equal( "max" );
        _done();
      } ).fail( _done );

    } );
  } )

} );