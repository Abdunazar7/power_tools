const Joi = require("joi");

const createOrderSchema = Joi.object({
  client_id: Joi.number().positive().required(),
  shop_tool_id: Joi.number().positive().required(),
  order_date: Joi.date().required(),
  period: Joi.number().positive().required(),
});

const updateOrderSchema = Joi.object({
  client_id: Joi.number().positive().optional(),
  shop_tool_id: Joi.number().positive().optional(),
  order_date: Joi.date().optional(),
  period: Joi.number().positive().optional(),
  total_price: Joi.number().positive().precision(2).optional(),
}).min(1);

module.exports = { createOrderSchema, updateOrderSchema };
