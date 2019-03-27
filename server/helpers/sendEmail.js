require('dotenv').config()
const nodemailer = require("nodemailer");

function sendEmail(data) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: "resta.adiputra@gmail.com",
    to: data.email,
    subject: "Happy Weekend",
    html:
      `Thank you for all your contributions during the this week. ${data.count === 0 ? 'You never ask question to community. Ask something to contribute.' : 'You already ask ' + data.count + 'questions. Keep asking as community become bigger. Thank you.'}
      - HacktivOverflow -`
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('success')
    }
  });
}

module.exports = sendEmail