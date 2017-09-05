// This is the schema for the database containing a user information

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var schema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    views: {type: Number},
    description: {type: String, maxLength: 400},
    createdAt: {type: Date, default: Date.now}
});

schema.pre('save', function(next){
    if (!this.views) {
        this.views = 0;
    }
    next();
});


schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);