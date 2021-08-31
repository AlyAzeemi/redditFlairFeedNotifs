const mongoose = require("mongoose");

subRedditSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    flairs: { type: Array, required: true },
    lastRead: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subreddits", subRedditSchema);
