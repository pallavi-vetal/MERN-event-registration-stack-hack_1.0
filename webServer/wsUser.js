
exports.registerUser = async (req, res) => {
    let user_defined_error = require('../utils/error');
    try {
        let user = require('../components/user/user.presentation');
        if (!req._body) {
            let error = user_defined_error.basicError('Body cannot be empty.');
            throw error;
        } else if (Object.keys(req.body).length == 0) {
            let error = user_defined_error.basicError('Object cannot be empty.');
            throw error;
        }

        let result = await user.registerUser(req, res);
    } catch (error) {
        error.status = 400;
        if (!error.hasOwnProperty('message')) {
            res.status(400).json(error);
        } else {
            res.status(400).json(user_defined_error.errorObject(error.message, error.status));
        }
    }
};

exports.loginUser = async (req, res) => {
    let user_defined_error = require('../utils/error');
    try {
        let user = require('../components/user/user.presentation');
        if(!req._body) {
            let error = user_defined_error.basicError('Body cannot be empty');
            throw error;
        } else if(Object.keys(req.body).length == 0) {
            let error = user_defined_error.basicError('Object cannot be empty.');
            throw error;
        }
        
        let result = await user.loginUser(req, res);
        
    } catch (error) {
        error.status = 400;
        if(!error.hasOwnProperty('message')) {
            res.status(400).json(error);
        } else {
            res.status(400).json(user_defined_error.errorObject(error.message, error.status));
        }
    }
};
