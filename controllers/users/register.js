const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { sendEmail } = require("../../helpers");
const { User } = require("../../models");

const register = async (req, res) => {
  const { subscription, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const verificationToken = v4();
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: `Підтвердження email`,
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Підтвердити email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email: result.email,
        subscription: result.subscription,
        avatarURL: result.avatarURL,
        verificationToken: result.verificationToken,
      },
    },
  });
};

module.exports = register;
