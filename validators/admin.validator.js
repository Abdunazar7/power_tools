const Joi = require("joi");

const createAdminSchema = Joi.object({
  full_name: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone_number: Joi.string().required(),
  is_active: Joi.boolean().required(),
  is_creator: Joi.boolean().required(),
});

const updateAdminSchema = Joi.object({
  full_name: Joi.string().min(3).max(255).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  phone_number: Joi.string().optional(),
  is_active: Joi.boolean().optional(),
  is_creator: Joi.boolean().optional(),
}).min(1);

module.exports = { createAdminSchema, updateAdminSchema };
