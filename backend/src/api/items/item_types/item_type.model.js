const { Model }  = require('objection');

const tableNames = require('../../../constant/tableNames');
const schemaitemType = require('./item_types.schema.json');

class Company extends Model {
    static get tableName() {
        return tableNames.item_type;
    }

    static get jsonSchema() {
        return schemaitemType;
    }

}

module.exports = Company;
