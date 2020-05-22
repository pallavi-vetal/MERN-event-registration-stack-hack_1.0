
exports.registerUser = async (p_user_data) => {
    try {
        let user_defined_error = require('../../utils/error');
        let user = require('./user.DAL');
        if (p_user_data.name == null || p_user_data.name == undefined
            || p_user_data.email == null || p_user_data.email == undefined
            || p_user_data.password == null || p_user_data.password == undefined
            || p_user_data.adminPassCode == null || p_user_data.adminPassCode == undefined) {
            let error = user_defined_error.basicError('fields cannot be null or undefined.');
            throw error;
        }
        let result = await user.registerUser(p_user_data);
        return (result);
    } catch (error) {
        throw error;
    }
};
