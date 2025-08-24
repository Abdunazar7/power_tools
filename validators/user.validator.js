const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  phone_number: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  is_active: Joi.boolean().required(),
  role: Joi.string().valid("client", "owner").required(),
  address: Joi.string().required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(255).optional(),
  phone_number: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  is_active: Joi.boolean().optional(),
  role: Joi.string().valid("client", "owner").optional(),
  address: Joi.string().optional(),
}).min(1);

module.exports = { createUserSchema, updateUserSchema };
