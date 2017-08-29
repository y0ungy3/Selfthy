var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');
var schema = new Schema({
    picture: {type: Schema.Types.Mixed, required: true},
    description: {type: String},
    createdAt: {type: Date, default: Date.now},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

// Sets the createdAt parameter equal to the current time
schema.pre('save', function(next){
    var now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});


module.exports = mongoose.model('Item', schema);