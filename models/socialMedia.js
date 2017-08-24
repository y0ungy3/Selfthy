// this contains the information for a link
// example: www.facebook.com/username
// along with description of that link of whatever user would like to say about it

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    link: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('SocialMedia', schema);