const express = require('express');

//const queriesTableStates = require('./states.querys');
const State = require('./states.model');

const router = express.Router();

router.get('/', async (req, res, next) => {

    try {
        const allStates = await State.query()
            .select().where('delete_at', null);
        res.json(allStates);
    } catch (exception) {
        next(exception);
    }


});

router.get('/StateParameters/', async (req, res, next) => {
    //const { id } = req.params;

    try {
        const state = await  State
            .query().select()
            .where(req.body).andWhere('delete_at', null).first();
        if(state) {
            return  res.json(state);
        }

        return next();
    } catch (exception) {
        return next(exception);
    }

});

router.post('/', async (req, res, next) => {
    try {
        const newState = await State
            .query().insert(req.body);

        res.json(newState);
    } catch (exception) {
        next(exception);
    }
});

module.exports = router;
