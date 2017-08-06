import express from 'express';
const router = express.Router();
import passport from 'passport'
import jwt from 'jsonwebtoken';
import User from '../models/users';
import config from '../config/database'

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });

    User.addUser(newUser, (err, user) => {
        "use strict";
        if(err) {
            res.json({success: false, msg: 'Failed to register user.'});
        } else {
            res.json({success: true, msg: 'User successfully registered.'});
        }
    })
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        "use strict";
        if(err) throw err;
        if(!user) res.json({success: false, msg: 'User not found.'});

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        emal: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password.'})
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

module.exports = router;