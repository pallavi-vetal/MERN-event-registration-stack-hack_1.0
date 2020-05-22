exports.registerUser = async (p_body) => {
    try {
        let user_defined_error = require('../../utils/error');
        let user_validator = require('./user.validation');
        let user = require('./user.controller');
        if (typeof p_body.name != 'string' || typeof p_body.email != 'string' || typeof p_body.password != 'string' || typeof p_body.adminPassCode != 'string') {
            let error = user_defined_error.basicError('Invalid type of fields');
            throw error;
        }

        //validation for email and password
        let {errors,flag} = user_validator.registerValidator(p_body);
        if (!flag) {
            //let error = is_user_valid;
            console.log("my errors",errors)
            throw errors;
        }

        if (p_body.adminPassCode !== 'secret') {
            let error = user_defined_error.basicError('Invalid admin pass code.');
            throw error;
        }

        let result = await user.registerUser(p_body);
        return (result);
    } catch (error) {
        throw error;
    }
};
