var mailClient = require("nodemailer");
const { serviceEmailAccount } = require("./secrets.json");
var id = 0;

var mail = mailClient.createTransport({
  service: "gmail",
  auth: {
    user: serviceEmailAccount.email,
    pass: serviceEmailAccount.password,
  },
});

async function sendPost(
  targetEmail,
  subReddit,
  flair,
  link,
  title,
  selfText,
  op
) {
  try {
    let mailOptions = {
      from: serviceEmailAccount.email,
      to: targetEmail,
      subject: `New Post:${subReddit}-${flair}`,
      html: `<h2>${title}</h2><p>${selfText}</p>${link}`,

      dsn: {
        id: id,
        return: "headers",
        notify: ["failure", "delay"],
        recipient: serviceEmailAccount.email,
      },
    };
    id++;
    res = await mail.sendMail(mailOptions);

    console.log(res);
  } catch (e) {
    console.log(`mailingAgent failed to send verification code: ${e}`);
    throw e;
  }
}
async function test() {
  await sendPost(
    "alykhawar@gmail.com",
    "SR",
    "Flair",
    "http://www.google.com",
    "Oh Poki",
    "A lot of people say that Pokimane is not really a talented streamer but she's famous. A lot of people say her success comes from looking good and i'd agree with them and some of these people say her success comes from her personality and all the time she's spent streaming and i'd also agree with them. The thing is I think i'm in love with Pokimane and I think she's super pretty, talented, amazing, beautifal, funny, and smart. I want to make Pokimane my wife and wake up to her next to me every morning. I want to please her in every way I can just to see the smile on her face. Every time I think about waking up next to her , it makes me so happy and so in love with her. I think she has one of the most beautiful bodies on this earth and I would like to see her with my own eyes every day. Her smile , her charm, her charisma, her laughter, her tears, her thoughts, her feelings. I want to share everything with this women that I've fallen for. I don't care that people are going to say that I have no chance with her it's fine but thinking about being with her makes me happy so why is it so wrong to have that. If you guys want to make fun of me for liking Pokimane that's fine but I'll always love her with everything I have. I want to be with Pokimane through life , through death, through thick and thin, through sadness and sorrow, and everlasting happiness, I want to be there. I know i've already said this before but I'll say it again make fun of me for falling in love with Pokimane but you'll never break the love i have for her."
  );
}

module.exports = { sendPost };
