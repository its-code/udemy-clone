const {createCourseSchema} = require('./course.schema')


module.exports = {
    addCourseValidation: async (req, res, next) => {
        const value = await createCourseSchema.validate(req.body);
        if (value.error) {
            res.status(400).json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next();
        }
    }
}    