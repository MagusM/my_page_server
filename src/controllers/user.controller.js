const User = require('../models/user.model');

exports.getUsers = async (req, res) => {

};

exports.saveUser = async (req, res) => {
    //TODO: add validation
    const user = new User({...req.body});
    user.save((err) => {
        if (err) {
            // throw err;
            console.log(err);
        }

        res.json(user);
    });
};

exports.getUserByEmail = async (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            throw err;
        }

        console.log('User found: ' + user.userDesc);

        return res.json(user);
    });
};

exports.dispatchUser = async (req, res) => {};

exports.updateUser = async (req, res) => {};

exports.deleteUser = async (req, res) => {
    User.deleteOne({_id: req.body.id}, (err, res) => {
        if (err) {
            throw err;
        }

        //TODO: fix
        res.send('OK');
    });
};

exports.login = async (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            throw err;
        }
     
        // test a matching password
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) {
                throw err;
            }
            console.log(`Password: ${req.body.password}`, isMatch);
            //TODO: update last login timestamp
            //TODO: create session with client
        });
    });
};