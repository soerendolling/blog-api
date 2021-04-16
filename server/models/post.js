const mongoose = require("mongoose");
const { Schema } = mongoose;
const PostSchema = new Schema(
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
module.exports = mongoose.model("Post", PostSchema);
//MongoDB is changing Post to posts. lowercase and s at the and
