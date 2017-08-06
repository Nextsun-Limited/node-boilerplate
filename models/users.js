import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type : String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

let getUserById = (id, callback) => {
    "use strict";
    User.findById(id, callback);
};

let getUserByUsername = (username, callback) => {
    "use strict";
    const query = {username: username};
    User.findOne(query, callback);
};

let addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        "use strict";
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

let comparePassword = (candidatePassword, hash, callback) => {
    "use strict";
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    })
};

module.exports = {
    getUserById,
    getUserByUsername,
    addUser,
    comparePassword
};