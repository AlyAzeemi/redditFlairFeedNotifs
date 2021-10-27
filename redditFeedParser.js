//await new Promise(r => setTimeout(r, 2000));
//res.data.children is the feed
//res.data.children[index].data.permalink is the relative post URL
//res.data.children[index].data.link_flair_text is post flair
//res.data.children[index].data.name is the posts unique identifier

const axios = require("axios");
let run = true;
const mongoPass = process.env.mongoPass;
const mongoPath = `mongodb+srv://aly:${mongoPass}@cluster0.fwdpv.mongodb.net/redditFlairFeedNotifsOmar?retryWrites=true&w=majority`;
const mongoose = require("mongoose");
const subRedditSchema = require("./models/subRedditSchema");
const mailer = require("./mailer");

async function queryAndSendUpdates(subReddit, email) {
  try {
    //Generate query
    let baseURL = "https://www.reddit.com";
    const res = await axios.get(
      `${baseURL}/r/${subReddit.name}/new.json?limit=100`
    );
    console.log(
      `Going through ${subReddit.name} for flairs: ${subReddit.flairs}....`
    );
    const feed = res.data.data.children;

    //Go through response feed
    for (let i = 0; i < feed.length; i++) {
      console.log(i);
      const postFlair = feed[i].data.link_flair_text;

      if (feed[i].data.name == subReddit.lastRead) {
        break;
      }
      if (feed[i].data.created_utc <= subReddit.lastRead_created_utc) {
        break;
      }
      if (subReddit.flairs.indexOf(postFlair) >= 0) {
        const postURL = baseURL + feed[i].data.permalink;
        console.log(
          `Found ${postFlair}:${postURL}\n${feed[i].data.title}\n${feed[i].data.selftext}\n`
        );
        //SendMailAndNotify
        if (email !== null) {
          await mailer.sendPost(
            email,
            subReddit.name,
            postFlair,
            postURL,
            feed[i].data.title,
            feed[i].data.selftext
          );
        }
      }
    }

    //Change LastRead Value
    subReddit.lastRead = feed[0].data.name;
    subReddit.lastRead_created_utc = feed[0].data.created_utc;
    await subReddit.save();
  } catch (e) {
    console.error(e);
  }
}

async function main(email) {
  try {
    //Retrieve subReddit list from mongoDB
    await mongoose.connect(mongoPath, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    const subRedditList = await subRedditSchema.find({});
    for (let i = 0; i < subRedditList.length; i++) {
      await queryAndSendUpdates(subRedditList[i], email);
    }
    return;
  } catch (e) {
    console.error(e);
    return;
  }
}

module.exports = { main };
