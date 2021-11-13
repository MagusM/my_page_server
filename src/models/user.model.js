const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        index: {
            unique: true,
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    last_login: {
        type: Date,
        required: true
    },
});

userSchema.pre('save', (next) => {
    let user = this;
    //if not pw not modified -> continue
    if (!user.isModified('password')) {
        return next();
    }

    //generate salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, hash) => {
        if (err) {
            return next(err);
        }

        user.password = hash;
        next();
    });
});

//TODO: will work without function declaration?
userSchema.methods.comparePassword = (candidatePassword, cb) => {
    bcrypt.comparePassword(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }

        cb(null, isMatch);
    });
}

userSchema.virtual('userDesc').get(() => {
    return `USER: ${this.name} | email: ${this.email} | last login: ${this.lastLogin}`;
});

module.exports = mongoose.model('User', userSchema);