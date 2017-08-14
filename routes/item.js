var express = require('express');
var router = express.Router();

var Post = require('../models/item');

// posting a item
router.post('/', function (req, res, next) {
    var post = new Post({
        description: req.body.description
    });
    post.save(function (err, result) {
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

module.exports = router;