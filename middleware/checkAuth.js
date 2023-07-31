module.exports = {
  ensureAuth: function ( req, res, next )
  {
    if ( req.isAuthenticated() )
    {
      return next();
    } else
    {
      res.redirect( '/' )
    }
  },
  // if you are loggedin and try to go to the landing page,
  // i don't wont them to see th login 
  ensureGuest: function ( req, res, next )
  {
    if ( req.isAuthenticated() )
    {
      res.redirect( '/dashboard' )
    } else
    {
      return next();
    }
  }
};