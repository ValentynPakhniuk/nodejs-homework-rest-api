const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, GMAIL_COM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: GMAIL_COM };
  try {
    await sgMail.send(email);
    console.log("sgMail.send(email):");
    return true;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

module.exports = sendEmail;
