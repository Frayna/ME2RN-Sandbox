var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Update = new Schema({
	time: {type: Date, required:true},
	changes: {type: Array, required:true},
},{
	collection: 'LastUpdate'
});

module.exports = mongoose.model('Update', Update);