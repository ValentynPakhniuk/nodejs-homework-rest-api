const { BadRequest, Unauthorized } = require("http-errors");
const { v4 } = require("uuid");

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const reVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized("Email is wrong");
  }
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }
  const verificationToken = v4();

  await User.findByIdAndUpdate(user._id, { verificationToken });

  const mail = {
    to: email,
    subject: `Confirmation email`,
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm email</a>`,
  };

  await sendEmail(mail);

  res.json({
    message: "Verification email sent",
    code: 200,
  });
};

module.exports = reVerifyEmail;
