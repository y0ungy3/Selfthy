// This is the schema for the database containing a user information

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var schema = new Schema({
    username: {type: String, required: true, unique: true, minlength: 6, maxlength: 100},
    password: {type: String, required: true, minlength: 6},
    views: {type: Number},
    description: {type: String, maxLength: 800},
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