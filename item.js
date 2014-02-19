var is = require( "sc-is" ),
  q = require( "q" ),
  pick = require( "sc-pick" ),
  hasKey = require( "sc-hasKey" ),
  request = require( "sc-request" ),
  emitter = require( "emitter-component" ),
  extendify = require( "sc-extendify" );

var defineProperties = function ( item, data, options ) {
  var self = item;

  options = is.an.object( options ) ? options : {};
  data = is.an.object( data ) ? data : {};

  Object.defineProperties( self, {

    "isTrackable": {
      get: function () {
        return self[ "__trackable" ] === true;
      }
    },

    "__options": {
      value: options
    },

    "__originalKeys": {
      value: Object.keys( data )
    }

  } );
};

var Item = extendify( {

  init: function ( data, options ) {

    defineProperties( this, data, options );

  },

  json: function ( json ) {
    var self = this

    json = json || pick( self, self.__originalKeys ); // TODO: handle if this is `raw`

    // If it's an observable array, omit the observable properties and methods to retrieve the raw array
    Object.keys( json ).forEach( function ( key ) {

      // Detect an observable array
      if ( ( hasKey( json, key + ".underlying", "array" ) || hasKey( json, key + ".array", "array" ) ) && hasKey( json, key + ".subscribe", "function" ) ) {
        json[ key ] = json[ key ].array || json[ key ].underlying;
      }

    } );

    return json;
  },

  destroy: function () {
    var self = this,
      defer = q.defer();

    request( {

      type: "DELETE",
      url: self.__options.url,
      data: self.json()

    } ).then( function ( res ) {
      defer.resolve( self );
    } ).fail( defer.reject );

    return defer.promise;
  }

} );

emitter( Item.prototype );

module.exports = Item;