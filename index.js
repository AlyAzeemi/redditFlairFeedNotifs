const express = require("express");
const subRedditSchema = require("./models/subRedditSchema");
const { main } = require("./redditFeedParser");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;
var email = process.env.recipient;

app.post("/", async (req, res) => {
  try {
    const subRedditList = req.body.subRedditList;
    //Retrieve previous list so that we can retain lastRead values throughout the updates
    const oldList = await subRedditSchema.find({});
    const oldSRs = oldList.map((r) => r.name);
    //wipe database
    await subRedditSchema.deleteMany({});

    //For each new entry check if they were in the previous list so lastRead can be carried over
    for (let i = 0; i < subRedditList.length; i++) {
      subReddit = new subRedditSchema(subRedditList[i]);
      let index = oldSRs.indexOf(subReddit.name);
      if (index >= 0) {
        subReddit.lastRead = oldList[index].lastRead;
      }
      await subReddit.save();
    }
    return res.status(200).send("List Updated Successfully!");
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send(`Internal Server Error, unable to process req:${e}`);
  }
});

app.listen(PORT, () => {
  console.log(`Now Listening on http://localhost:${PORT}`);
});
main(email);
