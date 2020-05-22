
const validator = require('validator').default;

exports.registerValidator = (p_data) => {
    let bool_flag_isValid = true;
    let errors = {};

    if (validator.isEmpty(p_data.name)) {
        errors.name = 'name is empty.';
        bool_flag_isValid = false;
    }

    if (validator.isEmpty(p_data.email)) {
        errors.email = 'email string is empty.';
        bool_flag_isValid = false;
    }

    if (validator.isEmpty(p_data.password)) {
        errors.password = 'password is empty.';
        bool_flag_isValid = false;
    }

    if (validator.isEmpty(p_data.adminPassCode)) {
        errors.adminPassCode = 'admin pass code is empty.';
        bool_flag_isValid = false;
    }

    if (!validator.isEmail(p_data.email)) {
        errors.email = 'Invalid email id entered.';
        bool_flag_isValid = false;
    }

    return ({ 'errors': errors, 'flag': bool_flag_isValid });
};
