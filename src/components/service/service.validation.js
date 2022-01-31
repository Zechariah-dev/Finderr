const Joi = require('joi');

exports.createServiceValidation = (payload) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
        categories: Joi.array().items(Joi.string()).required(),
     });

    return schema.validate(payload);
}

exports.updateServiceValidation = (payload) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
        categories: Joi.array().items(Joi.string()).required(),
    });

    return schema.validate(payload);
}