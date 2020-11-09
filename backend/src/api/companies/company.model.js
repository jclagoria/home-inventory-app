const { Model }  = require('objection');

const tableNames = require('../../constant/tableNames');
const schemaCompanie = require('./companies.schema.json');

class Company extends Model {
    static get tableName() {
        return tableNames.company;
    }

    static get jsonSchema() {
        return schemaCompanie;
    }

}

module.exports = Company;
