const express = require('express');

const Item = require('./items.model')
const item_type = require('./item_types/item_type.routes');

const router = express.Router({
    mergeParams: true,
});

router.use('/item_types', item_type);

router.post('/', async (req, res, next) => {

    try {

        const newItem = await Item
            .query().insert(req.body);

        res.json(newItem);
    } catch (exception) {
        next(exception);
    }
});

router.get('/', async (req, res, next) => {

    try {
        const allItems = await Item.query()
            .select().where('delete_at', null);
        res.json(allItems);
    } catch (exception) {
        next(exception);
    }

});

module.exports = router;
