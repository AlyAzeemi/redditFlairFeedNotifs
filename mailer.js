var mailClient = require("nodemailer");
const { serviceEmailAccount } = require("../secrets.json");
var id = 0;

var mail = mailClient.createTransport({
  service: "gmail",
  auth: {
    user: serviceEmailAccount.email,
    pass: serviceEmailAccount.password,
  },
});

async function sendVerificationCode(targetEmail, subReddit, flair, link) {
  try {
    let mailOptions = {
      from: serviceEmailAccount.email,
      to: targetEmail,
      subject: `NEW POST:${subReddit}-${flair}`,
      text: `${link}`,
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

module.exports = {};
