
exports.registerUser = async (req, res) => {
    try {
        let { basicError } = require('../../utils/error');
        let { registerUser } = require('./user.DAL');

        if (req.body.name == null || req.body.name == undefined
            || req.body.email == null || req.body.email == undefined
            || req.body.password == null || req.body.password == undefined
            || req.body.adminPassCode == null || req.body.adminPassCode == undefined) {
            let error = basicError('fields cannot be null or undefined.');
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
        let { loginUser } = require('./user.DAL');

        if (req.body.email == null || req.body.email == undefined || req.body.password == null || req.body.password == undefined) {
            let error = basicError('fields cannot be null or undefined.');
            throw error;
        }
        let result = await loginUser(req, res);
    } catch (error) {
        throw error;
    }
};
