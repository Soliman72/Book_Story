const Story = require( '../model/storyModel' );

exports.login = ( req, res ) =>
{
  res.render( 'login', {
    layout: 'login'
  } );
}
exports.dashboard = async( req, res ) =>
{
  try {
    const stories = await Story.find( { user: req.user._id } ).lean();

  res.render( 'dashboard', {
    name: req.user.firstName,
    stories 
  } );
  } catch (err) {
    console.log( err );
    res.render('errors/500')
  }
}
