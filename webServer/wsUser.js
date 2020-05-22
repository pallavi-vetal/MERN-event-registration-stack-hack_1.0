
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
        let body = req.body;
        let result = await user.registerUser(body);
        res.status(200).json(result);
    } catch (error) {
        error.status = 400;
        console.log("new:",error);
        if (!error.hasOwnProperty('message')) {
            res.status(400).json(error);
        } else {
            res.status(400).json(user_defined_error.errorObject(error.message, error.status));
        }
    }
};
