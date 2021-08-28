const mongoose = require("mongoose");

subRedditSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    flairs: { type: Array, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subreddits", subRedditSchema);
