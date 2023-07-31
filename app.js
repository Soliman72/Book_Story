const path = require( 'path' );
const express = require( 'express' );
const app = express();
const methodOverride=require('method-override')
const indexRoute = require( './router/indexRoute' );
const authRoute = require( './router/authRoute' );
const storyRoute = require( './router/storyRoute' );
const morgan = require( 'morgan' );
const { engine,create } = require( 'express-handlebars' );
// const exphbs = require( 'express-handlebars' );
const session = require( 'express-session' );
const MongoStore = require('connect-mongo');
const passport = require( 'passport' );


require( './controller/passport' )( passport );

//Body parser
app.use( express.urlencoded( { extended: false } ) );
app.use( express.json() );

//static folder 
app.use(express.static(path.join(__dirname, 'public')))

//login
if (process.env.NODE_ENV=== 'development'){
  app.use( morgan( 'dev' ) );
}

// method override 
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

//session middleware 
app.use(session({
  secret: 'secret', 
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl: process.env.DATABASE}),
}))

// passport middleware 
app.use( passport.initialize() );
app.use( passport.session() );

// Global variables 
app.use( ( req, res, next ) =>
{
  res.locals.user = req.user;
  next();
})

// Handelbars
app.engine( '.hbs', engine( {defaultLayout: 'main', extname: '.hbs' } ) );
app.set( 'view engine', '.hbs' );

require( './helpers/hbs' ).formatdate;
require( './helpers/hbs' ).truncate;
require( './helpers/hbs' ).stripTags;
require( './helpers/hbs' ).editIcon;
require( './helpers/hbs' ).select;




// Route mounting 
app.use( '/', indexRoute );
app.use( '/auth', authRoute );
app.use( '/stories', storyRoute );

module.exports = app;