const Joi = require('joi');

exports.signupValidation = (payload) => {
  const schema = Joi.object({
    firstname: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone_number: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(payload);
};

exports.loginValidation = (payload) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(payload);
};

exports.resetPasswordValidation = (payload) => {
  const schema = Joi.object({
    email: Joi.string().required(),
  });

  return schema.validate(payload);
};

exports.updatePasswordValidation = (payload) => {
  const schema = Joi.object({
    password: Joi.string().required(),
  });

  return schema.validate(payload);
};
