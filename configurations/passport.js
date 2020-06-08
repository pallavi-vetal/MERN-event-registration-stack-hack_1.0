/**
 * passport.js: Defines authentication strategy.
 */

const mongo_util = require('../utils/mongo.util');
const mongo_config = require('./mongo.config');
const jwt_strategy = require('passport-jwt').Strategy;
const extract_jwt = require('passport-jwt').ExtractJwt;
const options = {};
options.jwtFromRequest = extract_jwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = mongo_config.database.secretOrKey;

module.exports = passport => {
    let mongo_client = mongo_util.dbClient();
    passport.use(new jwt_strategy(options, async (jwt_payload, done) => {
        await mongo_client.collection.find({ '_id': jwt_payload.id }).then(user => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        }).catch(err => console.error(err));
    }));
};
