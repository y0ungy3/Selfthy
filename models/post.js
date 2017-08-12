var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    //TO DO: image
    description: {type: String},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.models('Post', schema);