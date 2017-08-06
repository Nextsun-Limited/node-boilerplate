const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
import User from '../models/users';
import config from './database';

module.exports = passport => {
    "use strict";
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_playload, done) => {
        User.getUserById(jwt_playload._doc._id, (err, user) => {
            if(err) return done(err, false);
            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }

        });
    }));
};