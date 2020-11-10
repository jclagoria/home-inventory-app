const { Model }  = require('objection');

const tableNames = require('../../constant/tableNames');
const schemaInventoryLocation = require('./inventory_location.schema.json');

class InventoryLocation extends Model {
    static get tableName() {
        return tableNames.inventory_location;
    }

    static get jsonSchema() {
        return schemaInventoryLocation;
    }

}

module.exports = InventoryLocation;
