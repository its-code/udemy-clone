const Joi = require('joi')

    const Schema = {
    createUserSchema: Joi.object().keys({
        name: Joi.string().trim().min(3).max(30).required(),
        email: Joi.string().email({minDomainSegments:2}).lowercase().trim().required(),
        password: Joi.string().min(6).max(15).required().strict(),
        age: Joi.number().integer().min(18)
    }),
    loginUserSchema: Joi.object().keys({
        email: Joi.string().email({minDomainSegments:2}).lowercase().trim().required(),
        password: Joi.string().min(6).max(15).required().strict()  
    }),
    updateUserSchema: Joi.object().keys({
        name: Joi.string().empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).empty(''),
        age: Joi.number().integer().min(18).empty()
    })
}    

module.exports = Schema