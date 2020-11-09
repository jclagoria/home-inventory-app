const knex = require('knex');
const { Model } = require('objection');

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile');

const connectionConfig = knexConfig[environment];

const connectionDB = knex(connectionConfig);

Model.knex(connectionDB);

module.exports = connectionDB;
