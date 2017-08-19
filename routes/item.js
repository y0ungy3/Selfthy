var express = require('express');
var router = express.Router();
var fs = require('fs');

var Item = require('../models/item');

// posting a item
router.post('/', function (req, res, next) {
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

module.exports = router;