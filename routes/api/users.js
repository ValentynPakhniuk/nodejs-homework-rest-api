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
