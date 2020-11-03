const express = require('express');

const queriesTableStates = require('./states.querys');

const router = express.Router();

router.get('/', async (req, res) => {

    const allStates = await queriesTableStates.find();
    res.json(allStates);
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const state = await queriesTableStates.get(parseInt(id, 10) || 0);
        if(state) {
            return  res.json(state);
        }

        return next();
    } catch (exception) {
        return next(error);
    }

});

module.exports = router;
