const Joi = require("joi");

exports.campaignSchema = Joi.object({
  name: Joi.string().required(),
  client: Joi.string().required(),
  status: Joi.string().valid("active", "paused", "completed"),
  budget: Joi.number().required(),
  spend: Joi.number().required(),
  impressions: Joi.number().required(),
  clicks: Joi.number().required(),
  conversions: Joi.number().required(),
});