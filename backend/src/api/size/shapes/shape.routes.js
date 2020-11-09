const express = require('express');

const Shape = require('./shape.model');

const router = express.Router();


router.get('/', async (req, res, next) => {

    try {
        const allShape = await Shape.query()
            .select()
            .where('delete_at', null);

        res.json(allShape);

    } catch (exception) {
        next(exception);
    }
});

router.post('/', async (req, res, next) => {

    try {

        const shape = await Shape
            .query().insert(req.body);

        res.json(shape);
    } catch (exception) {
        next(exception);
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const shape = await  Shape
            .query().select()
            .where('id', id);
        if(shape) {
            return  res.json(shape);
        }

        return next();
    } catch (exception) {
        return next(exception);
    }

});

module.exports = router;
