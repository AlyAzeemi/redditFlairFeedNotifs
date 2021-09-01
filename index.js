const express = require("express");
const subRedditSchema = require("./models/subRedditSchema");
const { main } = require("./redditFeedParser");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

app.post("/", async (req, res) => {
  try {
    const subRedditList = req.body.subRedditList;
    for (let i = 0; i < subRedditList.length; i++) {
      subReddit = new subRedditSchema(subRedditList[i]);
      await subReddit.save();
    }
    res.status(200).send("List Updated Successfully!");
  } catch (e) {
    console.log(e);
    res.status(500).send(`Internal Server Error, unable to process req:${e}`);
  }
});

app.listen(PORT, () => {
  console.log(`Now Listening on http://localhost:${PORT}`);
});
main();
