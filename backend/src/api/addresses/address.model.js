const { Model }  = require('objection');

const tableNames = require('../../constant/tableNames');
const schemaAdresses = require('./addresses.schema.json');

class Address extends Model {
    static get tableName() {
        return tableNames.address;
    }

    static get jsonSchema() {
        return schemaAdresses;
    }

}

module.exports = Address;
