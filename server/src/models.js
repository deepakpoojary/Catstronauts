const mongoose = require("./db");

const authorSchema = new mongoose.Schema({
  name: String,
  photo: String,
});

const trackSchema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  thumbnail: String,
  length: Number,
  modulesCount: Number,
});

const Author = mongoose.model("Author", authorSchema);
const Track = mongoose.model("Track", trackSchema);

module.exports = { Author, Track };
