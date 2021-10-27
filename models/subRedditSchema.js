const mongoose = require("mongoose");

subRedditSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    flairs: { type: Array, required: true },
    lastRead: { type: String, default: "" },
    lastRead_created_utc: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subreddits", subRedditSchema);
