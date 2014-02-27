var is = require( "sc-is" ),
  q = require( "q" ),
  pick = require( "sc-pick" ),
  hasKey = require( "sc-hasKey" ),
  emitter = require( "emitter-component" ),
  optionify = require( "sc-optionify" ),
  extendify = require( "sc-extendify" );

var defineProperties = function ( item, data ) {
  var self = item;

  data = is.an.object( data ) ? data : {};

  Object.defineProperties( self, {

    "isTrackable": {
      get: function () {
        return self[ "__trackable" ] === true;
      }
    },

    "__originalKeys": {
      value: Object.keys( data )
    }

  } );
};

var Item = extendify( {

  init: function ( data, options ) {

    this.option( is.an.object( options ) ? options : {} );

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
  }

} );

emitter( Item.prototype );
optionify( Item.prototype );

module.exports = Item;