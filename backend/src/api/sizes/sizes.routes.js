const express = require('express');

const Size = require('./sizes.model')
const shape = require('./shapes/shape.routes');

const router = express.Router({
    mergeParams: true,
});

router.use('/shapes', shape);

router.get('/', async (req, res, next) => {

    try {
        const allSize = await Size.query()
            .select().where('delete_at', null);
        res.json(allSize);
    } catch (exception) {
        next(exception);
    }


});

router.get('/ByParameters', async (req, res, next) => {

    try {
        const size = await  Size
            .query().select()
            .where(req.body);
        if(size) {
            return  res.json(size);
        }

        return next();
    } catch (exception) {
        return next(exception);
    }

});

router.post('/', async (req, res, next) => {
    try {
        const newSize = await Size
            .query().insert(req.body);

        res.json(newSize);
    } catch (exception) {
        next(exception);
    }
});

module.exports = router;
