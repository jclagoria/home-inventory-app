const express = require('express');

const shape = require('./shapes/shape.routes');

const router = express.Router({
    mergeParams: true,
});

router.use('/shapes', shape);

module.exports = router;
