const Joi = require("joi");

const createToolSchema = Joi.object({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  description: Joi.string().required(),
  tool_price: Joi.number().positive().precision(2).required(),
});

const updateToolSchema = Joi.object({
  name: Joi.string().optional(),
  brand: Joi.string().optional(),
  description: Joi.string().optional(),
  tool_price: Joi.number().positive().precision(2).optional(),
}).min(1);

module.exports = { createToolSchema, updateToolSchema };
