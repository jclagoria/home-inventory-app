const express = require('express');

const projectMessage = require('../constant/project');
const states =  require('./states/states.routes');
const users = require('./users/user.routes');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: projectMessage.message
    });
});

router.use('/states', states);
router.use('/users', users);

module.exports = router;
