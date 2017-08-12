// this contains the information for a link
// example: www.facebook.com/username
// along with description of that link of whatever user would like to say about it

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    link: {type: String, required: true},
    description: {type: String}
});

module.exports = mongoose.models('SocialMedia', schema);