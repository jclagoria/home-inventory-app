const express = require('express');
const yup = require('yup');

const Company = require('./company.model');

const router = express.Router();

const schemaValidation = yup.object().shape({
    email: yup.string().trim().email('Must be a valid email').required()
});

router.get('/', async (req, res, next) => {

    try {
        const allCompanies = await Company.query()
            .select()
            .where('delete_at', null);

        res.json(allCompanies);

    } catch (exception) {
        next(exception);
    }
});

router.post('/', async (req, res, next) => {

    const{ email } = req.body;

    try {

        const createCompany = {
            email
        };

        await schemaValidation.validate(
            createCompany,
            {abortEarly: false});

        const company = await Company
            .query().insert(req.body);

        res.json(company);
    } catch (exception) {
        next(exception);
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const company = await  Company
            .query().select()
            .where('id', id);
        if(company) {
            return  res.json(company);
        }

        return next();
    } catch (exception) {
        return next(exception);
    }

});

module.exports = router;
