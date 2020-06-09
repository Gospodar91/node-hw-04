const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)

class validations {
    validateRequest = (req, res, next) => {
        const rules = Joi.object({
            _id: Joi.objectId(req.params.id),
            name: Joi.string(),
            email: Joi.string(),
            phone: Joi.string(),
        });
        const validationResult = rules.validate(req.body);
        if (validationResult.error) {
            res.status(400).send({
                message: "missing required name field"
            });
            return;
        }
        next();
    };

    userValidateHW4 = (req, res, next) => {

        const rules = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()

        })
        const validationResult = rules.validate(req.body)
        if (validationResult.error) {
            return res.status(400).json(validationResult.error)
        }
        next()


    }


}
module.exports = new validations();