const { Model }  = require('objection');

const tableNames = require('../../constant/tableNames');
const schemaAdresses = require('./states.schema.json');

class State extends Model {
    static get tableName() {
        return tableNames.state;
    }

    static get jsonSchema() {
        return schemaAdresses;
    }

}

module.exports = State;
