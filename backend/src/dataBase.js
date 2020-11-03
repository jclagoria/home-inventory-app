const knex = require('knex');

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile');
const connectionConfig = knexConfig[environment];

const connectionDB = knex(connectionConfig);

module.exports = connectionDB;
