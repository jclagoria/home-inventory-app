const crypto = require('crypto');
const bcrypt = require('bcrypt');

const tableNames = require('../../src/constant/tableNames');
const orderedTableNames = require('../../src/constant/orderedTableNames');
const countries = require('../../src/constant/countries');
const us_states = require('../../src/constant/us_states');

/**
 * @param {import('knex')} knex
 */
exports.seed = async (knex) => {
    await orderedTableNames.reduce(async (promise, table_name) => {
        await promise;
        return knex(table_name).del();
    }, Promise.resolve());

    const password = crypto.randomBytes(15).toString('hex');

    const user = {
      email: 'lagoria79@yahoo.com.ar',
      name: 'JuanKa Lagoria',
      password: await bcrypt.hash(password, 12)
    };

    const [createdUser] = await knex(tableNames.user).insert(user).returning('*');

    console.log('User created:', {
        password
    }, createdUser);

    const insertedCountries = await knex(tableNames.country).insert(
        countries,
        '*'
    );

    const usa = insertedCountries.find((country) => country.code === 'US');

    us_states.forEach((state) => {
        state.country_id = usa.id;
    });

    await knex(tableNames.state).insert(us_states);

};
