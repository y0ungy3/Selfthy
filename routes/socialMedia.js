var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var SocialMedia = require('../models/socialMedia');

// get posts from one particular user
router.get('/:userId', function(req, res, next) {
    SocialMedia.find({user: req.params.userId}, function(err, social) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred, could not get websites for a user',
                error: {message: 'Could not get websites for a user'}
            });
        }
        // if no items found
        if (!social) {
            return res.status(500).json({
                title: 'No websites found for this user',
                error: {message: 'No websites found for this user'}
            });
        }
        res.status('200').json({
            message: 'Get websites for user successfully',
            obj: social
        });
    })
});

// all routers below this one will have to go through this one
// first before reaching other router
router.use('/', function (req, res, next) {
    // this checks if this is a valid token
    jwt.verify(req.query.token, '8gYxCLG9ehODLzJ9HGpf', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'User not Authenticated'}
            });
        }
        next();
    })
});

// posting a item
router.post('/', function (req, res, next) {
    // decode the JWT
    var decoded = jwt.decode(req.query.token);
    // find if that user exists
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: {message: 'Could not find the user'}
            });
        }
        var social = new SocialMedia({
            link: req.body.link,
            title: req.body.title,
            description: req.body.description,
            user: user
        });
        social.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An internal error occurred',
                    error: {message: 'Error occurred while trying to save'}
                });
            }
            res.status(201).json({
                message: 'Posted successfully',
                obj: result
            });
        });
    });
});

router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    SocialMedia.findById(req.params.id, function (err, social) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: {message: 'Could not find the item to delete'}
            });
        }
        if (!social) {
            return res.status(500).json({
                title: 'The item being deleted cannot be found',
                error: {message: 'The item being deleted cannot be found'}
            });
        }
        if (social.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not authenticated',
                error: {message: 'User do not match'}
            });
        }
        social.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: {message: 'Error while trying to remove the item'}
                });
            }
            res.status(200).json({
                message: 'Deleted Message Successfully',
                obj: result
            });
        })
    })
});

module.exports = router;