var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

// user registration
router.post('/', function (req, res, next) {
    const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        }
    );
    user.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Email or username already existed. Please login if you already have an account',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created successfully',
            obj: result
        });
    });
});

// user login
router.post('/login', function (req, res, next) {
    User.findOne({email: req.body.email}, function (err, user) {
        if (err) {
            res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Invalid username or password, please try again',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({user: user}, '8gYxCLG9ehODLzJ9HGpf', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        })
    });
});

module.exports = router;