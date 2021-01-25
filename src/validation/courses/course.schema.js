const Joi = require('joi')

    const Schema = {
    createCourseSchema: Joi.object().keys({
        title: Joi.string().trim().min(3).max(30).required(),
        category: Joi.string().lowercase().trim().required(),
        discription: Joi.string().min(6).required(),
        enroll: Joi.boolean().valid(true,false).required()
    }),
    updateCourseSchema: Joi.object().keys({
        title: Joi.string().empty(''),
        category: Joi.string().email().empty(''),
        discription: Joi.string().min(6).empty(''),
    })
}    

module.exports = Schema