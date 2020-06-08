
/**
 * wsUser.js : This Javascipt file contains all the menthods required to deal with user registration, login.
 * user login supports authentication using jwt and passport.
 * It is a wrapper for user controller
 */

exports.registerUser = async (req, res) => {
    let { basicError, errorObject } = require('../utils/error');
    let { registerUser } = require('../components/user/user.presentation');
    try {
        if (!req._body) {
            let error = basicError('Body cannot be empty.');
            throw error;
        } else if (Object.keys(req.body).length == 0) {
            let error = basicError('Object cannot be empty.');
            throw error;
        }

        let result = await registerUser(req, res);
    } catch (error) {
        error.status = 400;
        if (!error.hasOwnProperty('message')) {
            res.status(400).json(error);
        } else {
            res.status(400).json(errorObject(error.message, error.status));
        }
    }
};

exports.loginUser = async (req, res) => {
    let { basicError, errorObject } = require('../utils/error');
    let { loginUser } = require('../components/user/user.presentation');
    try {
        if (!req._body) {
            let error = basicError('Body cannot be empty');
            throw error;
        } else if (Object.keys(req.body).length == 0) {
            let error = basicError('Object cannot be empty.');
            throw error;
        }

        let result = await loginUser(req, res);
    } catch (error) {
        error.status = 400;
        if (!error.hasOwnProperty('message')) {
            res.status(400).json(error);
        } else {
            res.status(400).json(errorObject(error.message, error.status));
        }
    }
};
