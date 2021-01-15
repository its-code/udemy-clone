const {createUserSchema,loginUserSchema,updateUserSchema} = require('./user.schema')


module.exports = {
    addUserValidation: async (req, res, next) => {
        const value = await createUserSchema.validate(req.body);
        if (value.error) {
            res.status(422).json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next();
        }
    },
    loginUserValidation: async (req, res, next) => {
        const value = await loginUserSchema.validate(req.body);
        if (value.error) {
            res.status(422).json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next();
        }
    },
    updateUserValidation: async (req, res, next) => {
        const value = await updateUserSchema.validate(req.body);
        if (value.error) {
            res.status(422).json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next();
        }
    }
};