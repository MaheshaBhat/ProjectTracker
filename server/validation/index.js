const Joi = require('@hapi/joi');


const userValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        username: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);

}

module.exports.userValidation = userValidation;
module.exports.loginValidation = loginValidation;

