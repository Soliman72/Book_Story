const moment=require('moment')

var hbs = require('handlebars');

exports.formatdate = hbs.registerHelper( "formatDate", function ( date, format )
{
  return moment( date ).utc().format( format );
} );
exports.truncate = hbs.registerHelper("truncate" , function (str, len) {
  if (str.length > len && str.length > 0) {
    let new_str = str + ' '
    new_str = str.substr(0, len)
    new_str = str.substr(0, new_str.lastIndexOf(' '))
    new_str = new_str.length > 0 ? new_str : str.substr(0, len)
    return new_str + '...'
  }
  return str
} )
exports.stripTags = hbs.registerHelper("stripTags" , function (input) {
  return input.replace(/<(?:.|\n)*?>/gm, '')
} )
exports.editIcon = hbs.registerHelper( "editIcon", function ( storyUser, loggedUser, storyId, floating = true )
{
  if ( storyUser._id.toString() == loggedUser._id.toString() )
  {
    if ( floating )
    {
      return `<a href="/stories/edit/${ storyId }" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
    } else
    {
      return `<a href="/stories/edit/${ storyId }"><i class="fas fa-edit"></i></a>`
    }
  } else
  {
    return ''
  }
} );
exports.select = hbs.registerHelper("select" ,function (selected, options) {
  return options
    .fn(this)
    .replace(
      new RegExp(' value="' + selected + '"'),
      '$& selected="selected"'
    )
    .replace(
      new RegExp('>' + selected + '</option>'),
      ' selected="selected"$&'
    )
})
