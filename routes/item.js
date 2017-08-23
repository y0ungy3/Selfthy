var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Item = require('../models/item');
var User = require('../models/user');

// getting all the items
router.get('/', function(req, res, next) {
    Item.find({}, null, {sort: {createdAt: -1}})
        .populate('user', 'username')
        .exec(function (err, items) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred, could not get items from database',
                    error: {message: 'Could not get items from database'}
                });
            }
            res.status(200).json({
                message: 'Get Items Success',
                obj: items
            });
        });
});

// get posts from one particular user
router.get('/:userId', function(req, res, next) {
    Item.find({user: req.params.userId}, function(err, items) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: {message: 'Could not get posts from a user'}
            });
        }
        // if no items found
        if (!items) {
            return res.status(500).json({
                title: 'No posts found for this user',
                error: {message: 'No posts found for this user'}
            });
        }
        res.status('200').json({
            message: 'Get posts for user successfully',
            obj: items
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
                error: err
            });
        }
        var item = new Item({
            picture: req.body.picture,
            description: req.body.description,
            user: user
        });
        item.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An internal error occurred',
                    error: err
                });
            }
            user.items.push(result);
            user.save();
            res.status(201).json({
                message: 'Posted successfully',
                obj: result
            });
        });
    });
});

router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Item.findById(req.params.id, function (err, item) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: {message: 'Could not find the item to delete'}
            });
        }
        if (!item) {
            return res.status(500).json({
                title: 'The item being deleted cannot be found',
                error: {message: 'The item being deleted cannot be found'}
            });
        }
        if (item.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not authenticated',
                error: {message: 'User do not match'}
            });
        }
        item.remove(function (err, result) {
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