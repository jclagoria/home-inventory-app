const express = require('express');

const item_type = require('./item_types/item_type.routes');

const router = express.Router({
    mergeParams: true,
});

router.use('/item_types', item_type);


module.exports = router;
