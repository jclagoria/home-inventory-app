const express = require('express');

const Address = require('./address.model');

const router = express.Router();

router.get('/', async (req, res, next) => {

    try {
        const allAddress = await Address.query()
            .select()
            .where('delete_at', null);

        res.json(allAddress);

    } catch (exception) {
        next(exception);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const address = await Address
            .query().insert(req.body);

        res.json(address);
    } catch (exception) {
        next(exception);
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const adrress = await  Address
            .query().select()
            .where('id', id);
        if(adrress) {
            return  res.json(adrress);
        }

        return next();
    } catch (exception) {
        return next(exception);
    }

});

module.exports = router;
