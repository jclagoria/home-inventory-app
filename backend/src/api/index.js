const express = require('express');

const projectMessage = require('../constant/project');

const dbConnection = require('../dataBase');

const states =  require('./states/states.routes');
const users = require('./users/user.routes');
const auth = require('./auth/auth.routes');
const address = require('./addresses/addresses.routes');
const company = require('./companies/company.routes');
const items = require('./items/items.routes');
const sizes = require('./sizes/sizes.routes');
const countries = require('./countries/countries.routes');
const inventoryLocation = require('./inventoryLocation/inventory_location.routes');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: projectMessage.message
    });
});

router.use('/auth', auth);
router.use('/users', users);
router.use('/country', countries);
router.use('/states', states);
router.use('/address', address);
router.use('/company', company);
router.use('/items', items);
router.use('/sizes', sizes);
router.use('/inventory_location', inventoryLocation);

module.exports = router;
