var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var postSchema = Schema({
  title: String,
  url: String,
  date: Date,
  tags: [String],
  category: String,
  content: String,
  summary: String,
  isPublished: {type: Boolean, required: true, default: false},
  createdAt: {type: Date, required: true, default: Date.now},
  updatedAt: {type: Date, required: true, default: Date.now},
  publishedAt: Date,
  text: String,
  banner_bg: String,
});

module.exports = mongoose.model('Post', postSchema);
