const Joi = require("joi");

const joiRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
  avatarURL: Joi.string(),
});

const joiVerifySchema = Joi.object({
  email: Joi.string().email().required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  joiRegisterSchema,
  joiLoginSchema,
  joiVerifySchema,
};
