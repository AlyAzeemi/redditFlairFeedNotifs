const mongoose = require("mongoose");

subRedditSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    flairs: { type: Array, required: true },
    lastRead: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subreddits", subRedditSchema);
