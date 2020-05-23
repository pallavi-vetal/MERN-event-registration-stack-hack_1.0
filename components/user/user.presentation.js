exports.registerUser = async (req, res) => {
    try {
        let user_defined_error = require('../../utils/error');
        let user_validator = require('./user.validation');
        let user = require('./user.controller');
        if (typeof req.body.name != 'string' || typeof req.body.email != 'string' || typeof req.body.password != 'string' || typeof req.body.adminPassCode != 'string') {
            let error = user_defined_error.basicError('Invalid type of fields');
            throw error;
        }
        //validation for email and password
        let { errors, flag } = user_validator.registerValidator(req.body);
        
        if (!flag) {
            throw errors;
        }

        if (req.body.adminPassCode !== 'secret') {
            let error = user_defined_error.basicError('Invalid admin pass code.');
            throw error;
        }
        let result = await user.registerUser(req, res);
    } catch (error) {
        throw error;
    }
};


exports.loginUser = async (req, res) => {
    try {
        let user_defined_error = require('../../utils/error');
        let user_validator = require('./user.validation');
        let user = require('./user.controller');
        if (typeof req.body.email != 'string' || typeof req.body.password != 'string') {
            let error = user_defined_error.basicError('Invalid type of fields');
            throw error;
        }
        //validaton for email and password
        let { errors, flag } = user_validator.loginValidator(req.body);
        
        if(!flag) {
            throw errors;
        }
        
        let result = await user.loginUser(req, res);
    } catch (error) {
        throw error;
    }
};
