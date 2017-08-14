// This is the schema for the database containing a user information

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var schema = new Schema({
    //TO DO: image
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    description: {type: String, required: true},
    views: {type: String, required: true},
    links: [{type: Schema.Types.ObjectId, ref: 'SocialMedia'}],
    posts: [{type: Schema.Types.ObjectId, ref: 'Item'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);