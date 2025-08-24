const Joi = require("joi");

const createShopSchema = Joi.object({
  name: Joi.string().required(),
  owner_id: Joi.number().positive().required(),
  phone_number: Joi.string().required(),
  district_id: Joi.number().positive().required(),
  address: Joi.string().required(),
  location: Joi.string().required(),
});

const updateShopSchema = Joi.object({
  name: Joi.string().optional(),
  owner_id: Joi.number().positive().optional(),
  phone_number: Joi.string().optional(),
  district_id: Joi.number().positive().optional(),
  address: Joi.string().optional(),
  location: Joi.string().optional(),
}).min(1);

module.exports = { createShopSchema, updateShopSchema };
