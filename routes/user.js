var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

// user registration
router.post('/', function (req, res, next) {
    const user = new User({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10)
        }
    );
    user.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Username already existed. Please login if you already have an account or create a new one',
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
    User.findOne({username: req.body.username}, function (err, user) {
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
            userId: user._id,
            username: user.username
        })
    });
});

router.get('/:username', function (req, res, next) {
    User.find({username: req.params.username}, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        // if user doesn't exist
        if (!user) {
            return res.status(500).json({
                title: 'No user found',
                error: {message: 'User not found'}
            });
        }
        res.status('200').json({
            message: 'Get user successfully',
            obj: user
        });
    })
});


// Update a user
router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    // find the user
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(500).json({
                title: 'No user found',
                error: {message: 'User not found'}
            });
        }
        // check if the userID that the message belongs to is equal
        if (user._id != decoded.user._id) {
            return res.status(401).json({
                title: 'Not authenticated',
                error: {message: 'users do not match'}
            });
        }
        user.description = req.body.description;
        user.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Error trying to update user',
                    error: {message: 'Error trying to update user'}
                });
            }
            res.status(200).json({
                message: 'Updated user successfully',
                obj: result
            });
        })
    })
});


// update the number of view for a user profile
router.patch('/views/:username', function(req, res, next) {
    User.findOneAndUpdate({username : req.params.username}, {$inc : {'views' : 1}}, {new: true}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred while trying to update the number of views',
                error: {message: 'An error occurred while trying to update the number of views'}
            });
        }
        if (!user) {
            return res.status(500).json({
                title: 'No user found',
                error: {message: 'User not found'}
            });
        }
        res.status(200).json({
            message: 'Updated view successfully',
            obj: user
        });
    })
});

module.exports = router;