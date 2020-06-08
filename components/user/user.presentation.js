exports.registerUser = async (req, res) => {
    try {
        let { basicError } = require('../../utils/error');
        let { registerValidator } = require('./user.validation');
        let { registerUser } = require('./user.controller');

        if (typeof req.body.name != 'string' || typeof req.body.email != 'string' || typeof req.body.password != 'string' || typeof req.body.adminPassCode != 'string') {
            let error = basicError('Invalid type of fields');
            throw error;
        }
        //validation for email and password
        let { errors, flag } = registerValidator(req.body);

        if (!flag) {
            throw errors;
        }

        if (req.body.adminPassCode !== 'secret') {
            let error = basicError('Invalid admin pass code.');
            throw error;
        }
        let result = await registerUser(req, res);
    } catch (error) {
        throw error;
    }
};


exports.loginUser = async (req, res) => {
    try {
        let { basicError } = require('../../utils/error');
        let { loginValidator } = require('./user.validation');
        let { loginUser } = require('./user.controller');
        
        if (typeof req.body.email != 'string' || typeof req.body.password != 'string') {
            let error = basicError('Invalid type of fields');
            throw error;
        }
        //validaton for email and password
        let { errors, flag } = loginValidator(req.body);

        if (!flag) {
            throw errors;
        }

        let result = await loginUser(req, res);
    } catch (error) {
        throw error;
    }
};
