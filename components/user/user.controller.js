
exports.registerUser = async (req, res) => {
    try {
        let user_defined_error = require('../../utils/error');
        let user = require('./user.DAL');
        if (req.body.name == null || req.body.name == undefined
            || req.body.email == null || req.body.email == undefined
            || req.body.password == null || req.body.password == undefined
            || req.body.adminPassCode == null || req.body.adminPassCode == undefined) {
            let error = user_defined_error.basicError('fields cannot be null or undefined.');
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
        let user = require('./user.DAL');
        if (req.body.email == null || req.body.email == undefined || req.body.password == null || req.body.password == undefined) {
            let error = user_defined_error.basicError('fields cannot be null or undefined.');
            throw error;
        }
        let result = await user.loginUser(req, res);
    } catch (error) {
        throw error;
    }
};
