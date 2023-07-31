const Story = require( './../model/storyModel' )
const User = require( './../model/userModel' );

exports.createStory = async( req, res ) =>
{
  try
  {
    req.body.user = req.user._id
    await Story.create(req.body)
res.redirect('/dashboard')

  } catch (err) {
    console.log( err );
    res.render('errors/500')
  }
}

exports.getAllStories = async( req, res ) =>
{
  try {
    const stories = await Story.find( { status: 'public' } )
    .populate( 'user' )
    .sort( {createdAt:'desc' })
    .lean()
  
  res.render( 'stories/index', {
    stories,
    user: req.user 
  } );
  } catch (err) {
    console.log( err );
    res.render( 'errors/500' );
  }
} 

exports.editStory = async ( req, res ) =>
{
  let story = await Story.findOne( { _id: req.params.storyId } ).lean();;
  if ( !story ){
    return res.render('stories/404')
  } else{
    story = await Story.findByIdAndUpdate( req.params.storyId, req.body, {
      new: true,
      runValidators: true
    } )
  }
  
  res.redirect('/dashboard')
}

exports.deleteStory = async ( req, res ) =>
{
  let story = await Story.findOne( { _id: req.params.storyId } );

  if ( !story ){
    return res.render('errors/500')
  } else{
    story = await Story.findByIdAndDelete(req.params.storyId)
  }
  res.redirect( '/dashboard' );
}
// show single story 
exports.getStory =async ( req, res ) =>
{
  const story = await Story.findOne( { _id: req.params.storyId } )
    .populate( 'user' )
    .lean();
  if ( !story )
  {
    return res.render( '/dashboard' );
  } else
  {
    res.render( 'stories/story', {
      story
    })
  }
}
// get user information 
exports.getUser = async ( req, res ) =>
{
  const stories = await Story.find( { user: req.params.userId, status: 'public' } )
    .populate( 'user' )
    .lean();
  if ( !stories )
  {
    return res.render( 'errors/500' );
  } else
  {
    res.render( 'stories/index', {
      stories
    })
  }
}