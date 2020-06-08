
/**
 * event.validation.js : This Javascipt file contains all the required validation criteria's for valid I/O for event registration
 */

const validator = require('validator').default;

exports.eventValidator = (p_data) => {
    let bool_flag_isValid = true;
    let errors = {};
    let only_spaces = /^\s*$/;

    if (only_spaces.test(p_data.fullName) || validator.isEmpty(p_data.fullName)) {
        errors.name = 'Please provide full name';
        bool_flag_isValid = false;
    }

    if (only_spaces.test(p_data.mobile) || validator.isEmpty(p_data.mobile) || !validator.isMobilePhone(p_data.mobile, 'en-IN')) {
        errors.mobile = 'Please provide valid contact number';
        bool_flag_isValid = false;
    }
    if (validator.isEmpty(p_data.email)) {
        errors.email = 'Please provide email address';
        bool_flag_isValid = false;
    }

    if (validator.isEmpty(p_data.registrationType)) {
        errors.registrationType = 'Please registration type';
        bool_flag_isValid = false;
    }

    if (!validator.isEmail(p_data.email)) {
        errors.email = 'Please provide valid email address';
        bool_flag_isValid = false;
    }
    return ({ 'errors': errors, 'flag': bool_flag_isValid });
};

exports.feedbackValidator = (p_data) => {
    let bool_flag_isValid = true;
    let errors = {};
    let only_spaces = /^\s*$/;

    if (only_spaces.test(p_data.name) || validator.isEmpty(p_data.name)) {
        errors.name = 'Please provide valid name';
        bool_flag_isValid = false;
    }

    if (validator.isEmpty(p_data.email)) {
        errors.email = 'Please provide email address';
        bool_flag_isValid = false;
    }

    if (!validator.isEmail(p_data.email)) {
        errors.email = 'Please provide valid email address';
        bool_flag_isValid = false;
    }

    if (only_spaces.test(p_data.feedback) || validator.isEmpty(p_data.feedback)) {
        errors.feedback = 'Please provide valid feedback';
        bool_flag_isValid = false;
    }

    return ({ 'errors': errors, 'flag': bool_flag_isValid });
};
