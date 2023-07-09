const express = require("express");

const { validation, auth, upload, ctrlWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const {
  joiRegisterSchema,
  joiLoginSchema,
  joiVerifySchema,
} = require("../../schemas/user");

const router = express.Router();

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  validation(joiVerifySchema, "missing required field email"),
  ctrlWrapper(ctrl.reVerifyEmail)
);

module.exports = router;

// // using Twilio SendGrid's v3 Node.js Library
// // https://github.com/sendgrid/sendgrid-nodejs
// javascript
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'test@example.com', // Change to your recipient
//   from: 'test@example.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })

// npm install --save @sendgrid/mail

// echo "export SENDGRID_API_KEY='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'" > sendgrid.env
// echo "sendgrid.env" >> .gitignore
// source ./sendgrid.env

// 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;
