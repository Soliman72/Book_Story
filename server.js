const mongoose = require( 'mongoose' );

require( 'dotenv' ).config( { path: './config.env' } );

const app = require( './app' );

const DB = process.env.DATABASE;
mongoose.connect( DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
} )
  .then( () => { console.log( 'connected to DB...' ); } )
  .catch( err => console.log( err ) );


const port = process.env.PORT || 5000;
app.listen( port, () => { console.log( `server running in port ${ port }...` ); } )
