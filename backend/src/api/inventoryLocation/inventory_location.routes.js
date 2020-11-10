const express = require('express');

const Inventorylocation = require('./inventory_location.model');

const router = express.Router();

router.get('/', async (req, res, next) => {

    try {
        const allInventoryLocation = await Inventorylocation.query()
            .select().where('delete_at', null);
        res.json(allInventoryLocation);
    } catch (exception) {
        next(exception);
    }


});

router.get('/ByParameters', async (req, res, next) => {

    try {
        const inventoryLocation = await  Inventorylocation
            .query().select()
            .where(req.body).first();
        if(inventoryLocation) {
            return  res.json(inventoryLocation);
        }

        return next();
    } catch (exception) {
        return next(exception);
    }

});

router.post('/', async (req, res, next) => {
    try {
        const newInventoryLocation = await Inventorylocation
            .query().insert(req.body);

        res.json(newInventoryLocation);
    } catch (exception) {
        next(exception);
    }
});

module.exports = router;
