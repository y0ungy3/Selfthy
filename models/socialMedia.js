// this contains the information for a link
// example: www.facebook.com/username
// along with description of that link of whatever user would like to say about it

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    title: {type: String},
    description: {type: String},
    link: {type: String},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('SocialMedia', schema);