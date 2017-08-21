var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Item = require('../models/item');
var User = require('../models/user');

// getting all the items
router.get('/', function(req, res, next) {
    Item.find()
        .exec(function (err, items) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred, could not get items from database',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Get Items Success',
                obj: items
            });
        });
});

// all routers below this one will have to go through this one
// first before reaching other router
router.use('/', function (req, res, next) {
    // this checks if this is a valid token
    jwt.verify(req.query.token, '8gYxCLG9ehODLzJ9HGpf', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
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
            description: req.body.description
        });
        item.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An internal error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Posted successfully',
                obj: result
            });
        });
    });
});


module.exports = router;