const dbConnection = require('../../dataBase');

const tableNames = require('../../constant/tableNames');

const fields = [`${tableNames.state}.id`, `${tableNames.state}.name`,
    `${tableNames.state}.code`, `${tableNames.state}.delete_at`];

const joinFieldsCountry = `${tableNames.country}.id`;
const joinFieldState = `${tableNames.state}.country_id`;


module.exports = {
    //TODO add parameter country.id by default
    //TODO change de name for findAll()
    find() {
        return dbConnection(tableNames.state)
            .join(tableNames.country, joinFieldsCountry, joinFieldState)
            .select(fields).whereNull(`${tableNames.state}.delete_at`)
            .andWhere( `${tableNames.state}.country_id`, 236);
    },
    //TODO add parameter country.id by default
    async get(id) {
        return dbConnection(tableNames.state)
            .select(fields)
            .where({id}).andWhere( `${tableNames.state}.country_id`, 236)
            .first();
    }
};
