const express = require('express');

const Country = require('./countries.model');

const router = express.Router();

router.get('/', async (req, res, next) => {

    try {
        const allCountries = await Country.query()
            .select().where('delete_at', null);
        res.json(allCountries);
    } catch (exception) {
        next(exception);
    }


});

router.get('/ByParameters', async (req, res, next) => {

    try {
        const country = await  Country
            .query().select()
            .where(req.body).andWhere('delete_at', null).first();
        if(country) {
            return  res.json(country);
        }

        return next();
    } catch (exception) {
        return next(exception);
    }

});

router.post('/', async (req, res, next) => {
    try {
        const newCountry = await Country
            .query().insert(req.body);

        res.json(newCountry);
    } catch (exception) {
        next(exception);
    }
});

module.exports = router;
