const express = require('express');


const Item_Type = require('./item_type.model');

const router = express.Router();


router.get('/', async (req, res, next) => {

    try {
        const allItemType = await Item_Type.query()
            .select()
            .where('delete_at', null);

        res.json(allItemType);

    } catch (exception) {
        next(exception);
    }
});

router.post('/', async (req, res, next) => {

    try {

        const item_type = await Item_Type
            .query().insert(req.body);

        res.json(item_type);
    } catch (exception) {
        next(exception);
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const item_type = await  Item_Type
            .query().select()
            .where('id', id);
        if(item_type) {
            return  res.json(item_type);
        }

        return next();
    } catch (exception) {
        return next(exception);
    }

});

module.exports = router;
