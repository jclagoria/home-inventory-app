const { Model }  = require('objection');

const tableNames = require('../../constant/tableNames');
const schemaCountry = require('./countries.schema.json');

class Country extends Model {
    static get tableName() {
        return tableNames.country;
    }

    static get jsonSchema() {
        return schemaCountry;
    }

}

module.exports = Country;
