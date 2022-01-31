const Joi = require('joi');

exports.createProductValidation = (payload) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
        pricing: Joi.number().required(),
        categories: Joi.array().items(Joi.string()).required(),
        details: Joi.object({ color: Joi.string().required(), manufacturer: Joi.string().required(), size: Joi.string() })   
     });

    return schema.validate(payload);
}

exports.updateProductValidation = (payload) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
        pricing: Joi.number().required(),
        categories: Joi.array().items(Joi.string()).required(),
        details: Joi.object({ color: Joi.string().required(), manufacturer: Joi.string().required() })   
    });

    return schema.validate(payload);
}