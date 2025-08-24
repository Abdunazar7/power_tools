const Joi = require("joi");

const createShopToolSchema = Joi.object({
  shop_id: Joi.number().positive().required(),
  tool_id: Joi.number().positive().required(),
  rent_price: Joi.number().positive().precision(2).required(),
});

const updateShopToolSchema = Joi.object({
  shop_id: Joi.number().positive().optional(),
  tool_id: Joi.number().positive().optional(),
  rent_price: Joi.number().positive().precision(2).optional(),
}).min(1);

module.exports = { createShopToolSchema, updateShopToolSchema };
