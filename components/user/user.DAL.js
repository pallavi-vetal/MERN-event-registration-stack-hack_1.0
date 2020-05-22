const mongo_util = require('../../utils/mongo.util');
const mongo_config = require('../../configurations/mongo.config');

exports.registerUser = async (p_user_data) => {
    try {
        let user_defined_error = require('../../utils/error');
        let mongo_client = await mongo_util.dbClient();
        p_user_data.date = new Date();

        let bool_user_exists = await mongo_client.collection(mongo_config.collection_names.users).aggregate([
            { '$match': { 'email': p_user_data.email } }
        ]).toArray();

        if(bool_user_exists.length == 1) {
            let error = user_defined_error.basicError('User already registered with the given email id.');
            throw error;
        }
        
        let response = await mongo_client.collection(mongo_config.collection_names.users).insertOne(p_user_data);

        response.result.insertedId = response.insertedId;

        return (response.result);
    } catch (error) {
        throw error;
    }
};
