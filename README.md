# TOC
   - [DataService](#dataservice)
<a name=""></a>
 
<a name="dataservice"></a>
# DataService
A data service (currently extended by `itemservicejs` and `entityservicejs`).

```js
var data = new scdata( {
      url: "/api/people"
    } );
    data.get().parameter( "name", "max" ).execute().then( function ( max ) {
      max.name.should.equal( "max" );
    } );
```

