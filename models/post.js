const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  content: {
    type: String,
    required: [true, "Please provide some content"],
  },
  author: {
    type: String,
    required: [true, "Please provide an author"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  visible: {
    type: Boolean,
    default: false,
  },
});

// Virtual for Date - Formatted to DD/MM/YYYY
PostSchema.virtual("date_formatted").get(function () {
  return this.date.toLocaleDateString("en-GB");
});

module.exports = mongoose.model("Post", PostSchema);
