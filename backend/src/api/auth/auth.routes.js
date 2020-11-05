const express = require('express');
const yup = require('yup');
const bcrypt = require('bcrypt');

const jwt = require('../../lib/jwt');
const User = require('../users/user.model');

const router = express.Router();

const schemaItemsValidation = yup.object().shape({
    name: yup.string().trim().min(7).required(),
    email: yup.string().trim().email('Must be a valid email').required(),
    password: yup.string().trim()
        .min(8)
        .matches(/[^A-Za-z0-9]/, 'password must contain a special character')
        .matches(/[A-Z]/, 'password must contain an uppercase letter')
        .matches(/[a-z]/, 'password must contain a lowercase letter')
        .matches(/[0-9]/, 'password must contain a number')
        .required(),
});

const schemaLoginValidation = yup.object().shape({
    email: yup.string().trim().email('Must be a valid email').required(),
    password: yup.string().trim()
        .min(8)
        .matches(/[^A-Za-z0-9]/, 'password must contain a special character')
        .matches(/[A-Z]/, 'password must contain an uppercase letter')
        .matches(/[a-z]/, 'password must contain a lowercase letter')
        .matches(/[0-9]/, 'password must contain a number')
        .required(),
});

const errorMessage = {
    invalidLogin: 'Invalid Login.',
    emailInUse: 'Email in use.'
};

router.post('/signup', async (req, res, next) => {
    const{ name, email, password } = req.body;
    try {
        const createUser = {
            name,
            email,
            password
        };

        await schemaItemsValidation.validate(
            createUser,
            {abortEarly: false});

        const existingUser = await User.query()
            .where({email}).first();

        if(existingUser) {
            const error = new Error(errorMessage.emailInUse);
            res.status(403);
            throw  error;
        }

        const hashedPassword = await bcrypt
            .hash(password, 12);

        const insertedUser = await User.query().insert({
            name,
            email,
            password: hashedPassword
        });

        delete insertedUser.password;

        const payload = {
            id: insertedUser.id,
            name,
            email
        };

        const token = await jwt.sign(payload);

        res.json({
            user: payload,
            token
        });
    } catch(error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {

    const { email, password } = req.body;

    try{
        await schemaLoginValidation.validate(
            {
                email,
                password
            },
            {
                abortEarly: false
            }
        );

        const user = await User.query()
            .where({ email }).first();

        if ( !user ) {
            const error = new Error(errorMessage.invalidLogin);
            res.status(403);
            throw error;
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword) {
            const error = new Error(errorMessage.invalidLogin);
            res.status(400);
            throw error;
        }

        const payload = {
            id: user.id,
            name: user.name,
            email
        }

        const token = await jwt.sign(payload);

        res.json({
            user: payload,
            token
        });

    } catch (error) {
        next(error);
    }
});

module.exports = router;
