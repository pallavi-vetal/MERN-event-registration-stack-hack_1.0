
const validator = require('validator').default;

exports.registerValidator = (p_data) => {
    let bool_flag_isValid = true;
    let errors = {};

    if (validator.isEmpty(p_data.name)) {
        errors.name = 'Please provide name';
        bool_flag_isValid = false;
    }

    if (validator.isEmpty(p_data.email)) {
        errors.email = 'Please provide email address';
        bool_flag_isValid = false;
    }

    if (validator.isEmpty(p_data.password)) {
        errors.password = 'Please provide password';
        bool_flag_isValid = false;
    }

    if (validator.isEmpty(p_data.adminPassCode)) {
        errors.adminPassCode = 'Please provide admin passcode';
        bool_flag_isValid = false;
    }

    if (!validator.isEmail(p_data.email)) {
        errors.email = 'Please provide valid email address';
        bool_flag_isValid = false;
    }
    return ({ 'errors': errors, 'flag': bool_flag_isValid });
};

exports.loginValidator = (p_data) => {
    let bool_flag_isValid = true;
    let errors = {};


    if (validator.isEmpty(p_data.email)) {
        errors.email = 'Please provide email address';
        bool_flag_isValid = false;
    }

    if (validator.isEmpty(p_data.password)) {
        errors.password = 'Please provide password';
        bool_flag_isValid = false;
    }

    if (!validator.isEmail(p_data.email)) {
        errors.email = 'Please provide valid email address';
        bool_flag_isValid = false;
    }
    return ({ 'errors': errors, 'flag': bool_flag_isValid });
};
