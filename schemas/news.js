var mongoose = require('mongoose');
var newsSchema = new mongoose.Schema({
    title: String,
    description: String,
    story: String,
    type: Number,
    imageUrl: String,
    published: mongoose.Schema.Types.Date
});
module.exports = newsSchema;