const { Model }  = require('objection');

const tableNames = require('../../constant/tableNames');
const schemaSize = require('./sizes.schema.json');

class Size extends Model {
    static get tableName() {
        return tableNames.size;
    }

    static get jsonSchema() {
        return schemaSize;
    }

}

module.exports = Size;
