var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');
var schema = new Schema({
    picture: {type: Schema.Types.Mixed, required: true},
    description: {type: String},
    createdAt: {type: Date, default: Date.now},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    tags: [{type: String}]
});

module.exports = mongoose.model('Item', schema);