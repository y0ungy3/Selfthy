// This is the schema for the database containing a user information

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var schema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    views: {type: String},
    picture: {type: Schema.Types.Mixed},
    description: {type: String},
    links: [{type: Schema.Types.ObjectId, ref: 'SocialMedia'}],
    items: [{type: Schema.Types.ObjectId, ref: 'Item'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);