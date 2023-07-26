const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Song = new Schema(
  {
    name: {type: String, required: true},
    imageURL: {type: String, required: true},
    songURL: {type: String, required: true},
    artists: [{type: String, required: true}],
    likes: {type: Number, required: true},
    views: {type: Number, required: true},
  },
  {timestamps: true},
);

module.exports = mongoose.model('songs', Song);
