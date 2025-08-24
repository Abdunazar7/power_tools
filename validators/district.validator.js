const Joi = require("joi");

const createDistrictSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
});

const updateDistrictSchema = Joi.object({
  name: Joi.string().min(2).max(255).optional(),
}).min(1);

module.exports = { createDistrictSchema, updateDistrictSchema };
