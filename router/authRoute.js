const passport = require( 'passport' );
const express = require( 'express' )
const router = express.Router();

//  Authentication
router.get('/google',
  passport.authenticate( 'google', { scope: [ 'profile' ] } ) );

router.get( '/google/callback',
  passport.authenticate( 'google', { failureRedirect: '/' } ),
  function ( req, res ){
    res.redirect( '/dashboard' );
  } );

router.get( '/logout', ( req, res , next ) =>
{
  req.logOut( ( err ) =>
  {
    if(err) return next(err) 
  });
  res.redirect('/')
})

  
module.exports = router
