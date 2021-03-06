var is = require( "sc-is" ),
  Item = require( "./item" ),
  config = require( "./config.json" ),
  Query = require( "sc-query" ),
  q = require( "q" ),
  merge = require( "sc-merge" ),
  hasKey = require( "sc-hasKey" ),
  emitter = require( "emitter-component" ),
  optionify = require( "sc-optionify" ),
  extendify = require( "sc-extendify" );

var Data = extendify( {

  init: function ( options ) {
    var self = this;

    self.option( merge( {}, options ) );
    self.url = hasKey( self.options, "url", "string" ) ? self.options.url : "";
    self.type = hasKey( self.options, "type", "string" ) ? self.options.type : config.defaultHttpMethod;
    self.headers = hasKey( self.options, "headers", "object") ? self.options.headers : {};
  },

  get: function ( url, options ) {
    var self = this;
    url = is.a.string( url ) ? url : self.url;
    options = is.an.object( url ) ? url : options || {};
    options = merge( options, { headers: self.headers } );
    return new Query( self.url, "get", options );
  },

  put: function ( url, options ) {
    var self = this;
    url = is.a.string( url ) ? url : self.url;
    options = is.an.object( url ) ? url : options || {};
    options = merge( options, { headers: self.headers } );
    return new Query( self.url, "put", options );
  },

  post: function ( url, options ) {
    var self = this;
    url = is.a.string( url ) ? url : self.url;
    options = is.an.object( url ) ? url : options || {};
    options = merge( options, { headers: self.headers } );
    return new Query( self.url, "post", options );
  },

  delete: function ( url, options ) {
    var self = this;
    url = is.a.string( url ) ? url : self.url;
    options = is.an.object( url ) ? url : options || {};
    options = merge( options, { headers: self.headers } );
    return new Query( self.url, "delete", options );
  }

} );

emitter( Data.prototype );
optionify( Data.prototype );

exports = module.exports = Data;
exports.config = config;
exports.Query = Query;
exports.Item = Item;