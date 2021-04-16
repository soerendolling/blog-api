const mongoose = require("mongoose");
const { Schema } = mongoose;
const CommentSchema = new Schema(
  {
    title: String,
    body: String,
    votes: {
      up: Number,
      down: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("Comment", CommentSchema);
//MongoDB is changing Post to posts. lowercase and s at the and
