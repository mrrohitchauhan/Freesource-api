const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  username: { type: String, default:'tara' },
  title: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: Date, default:Date.now()},
  category:[],
  resource:{type:String}
}, {
  timestamps: true,
});

const Posts = mongoose.model('Posts', postSchema);

module.exports = Posts;