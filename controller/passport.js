const googleStrategy=require('passport-google-oauth20').Strategy 
const mongoose = require( 'mongoose' );
const User = require( './../model/userModel' );

module.exports = function ( passport )
{
  passport.use( new googleStrategy( {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
    async ( accessToken, refreshToken, profile, cb ) =>
    {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile._json.given_name,
        lastName: profile._json.family_name,
        image: profile.photos[ 0 ].value
      };

      let user = await User.findOne( { googleId: profile.id } );
      try
      {
        
        if ( user ){  
          cb( null, user );
        } else{
          user = await User.create( newUser );
          cb( null, user )
        }
      } catch (err) {
        console.log(err);
      }
    }
  ) )

  passport.serializeUser((user, cb) => {
    cb(null, user.id)
  })

  passport.deserializeUser(async(id, cb) => {
    try {
      const user = await User.findById(id)
      if(user) return cb(null , user)
    } catch (err) {
      console.log(err)
    }
  })
    
}