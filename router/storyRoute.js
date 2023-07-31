const express = require( 'express' )
const router = express.Router();
const Story = require( './../model/storyModel' )

const storyController =require('./../controller/storyController')
const { ensureAuth } = require( './../middleware/checkAuth' );

// rendered add story page
router.get( '/add', ensureAuth,( req, res ) =>
{
  res.render( 'stories/add' );
} );

// rendered edit story page
router.get( '/edit/:storyId', ensureAuth,async( req, res ) =>
{
  const story = await Story.findOne( { _id: req.params.storyId } ).lean();
  
  if ( !story )
  {
    return res.render('errors/404')
  }
    res.render( 'stories/edit', {
      story
    })
} );


router.post( '/', ensureAuth, storyController.createStory )
router.get( '/',ensureAuth ,storyController.getAllStories)
router.get('/:storyId' ,ensureAuth, storyController.getStory)
router.patch( '/:storyId', ensureAuth, storyController.editStory )
router.delete( '/:storyId', ensureAuth, storyController.deleteStory )
// GET /stories/user/64c6c0aa4bd963e012371626
router.get( '/user/:userId', ensureAuth, storyController.getUser )

module.exports=router
