const express = require('express');

const queriesTableStates = require('./states.querys');

const router = express.Router();

router.get('/', async (req, res) => {

    const allStates = await queriesTableStates.find();

    res.json(allStates);
});

module.exports = router;
