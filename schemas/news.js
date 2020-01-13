var mongoose = require('mongoose');
var newsSchema = new mongoose.Schema({
    title: String,
    description: String,
    story: String,
    type: Number,
    imageUrl: String
});
module.exports = newsSchema;