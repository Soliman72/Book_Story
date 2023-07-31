const express = require( 'express' )
const router = express.Router();
const indexController = require( './../controller/indexController' );
const { ensureAuth, ensureGuest } = require( './../middleware/checkAuth' );
  
router.get( '/',ensureGuest , indexController.login );
router.get( '/dashboard',ensureAuth , indexController.dashboard );

module.exports=router
