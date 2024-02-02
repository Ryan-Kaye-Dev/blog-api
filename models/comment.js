const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  content: {
    type: String,
    required: [true, "Please provide content"],
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
