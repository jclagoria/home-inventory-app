const express = require('express');

const User = require('./user.model');

const router = express.Router();

router.get('/', async (req, res) => {

    const allUsers = await User.query()
        .select('id', 'email', 'name')
        .where('delete_at', null);

    res.json(allUsers);
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await  User
            .query().select()
            .where('id', id);
        if(user) {
            return  res.json(user);
        }

        return next();
    } catch (exception) {
        return next(exception);
    }

});

module.exports = router;
