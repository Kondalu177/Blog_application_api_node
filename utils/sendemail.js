const nodemailer = require("nodemailer");
const { senderemail, sendermailPassword } = require("../config/keys");

const sentmali = async ({ emailTo, subject, code, content }) => {
  const trasporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user: senderemail, pass: sendermailPassword },
  });
  const message = {
    to: emailTo,
    subject,
    html: `<div>
    <h3>use this  bellow code  to ${content}</h3>
    <p> <strong>Code:    ${code}</strong></p>
        </div>`,
  };
  await trasporter.sendMail(message);
};

module.exports = sentmali;
