const Joi = require('joi');

exports.createBusinessValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(90).required(),    
    description: Joi.string().email().required(),
    tags: Joi.array().items(Joi.string()).required(),
    contact: Joi.object({
      phone_number: Joi.string().required(), 
      address: Joi.string().min(3).max(30).required(),
      whatsapp_number: Joi.string(), 
      website: Joi.string(), 
      email: Joi.string() 
    }).required(),
    isRegistered: Joi.boolean().required(),
    company_legal_name: Joi.string().min(3).max(50),
    company_registration_number: Joi.string().min(3).max(50),
    company_address: Joi.string().min(3).max(50)
  });

  return schema.validate(payload);
};

exports.updateBusinessValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(90).required(),    
    description: Joi.string().email().required(),
    tags: Joi.array().items(Joi.string()).required(),
    contact: Joi.object({
      phone_number: Joi.string().required(), 
      address: Joi.string().min(3).max(30).required(),
      whatsapp_number: Joi.string(), 
      website: Joi.string(), 
      email: Joi.string() 
    }).required(),
    isRegistered: Joi.boolean().required(),
    company_legal_name: Joi.string().min(3).max(50),
    company_registration_number: Joi.string().min(3).max(50),
    company_address: Joi.string().min(3).max(50)
  });

  return schema.validate(payload);
};
