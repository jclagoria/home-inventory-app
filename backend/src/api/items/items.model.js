const { Model }  = require('objection');

const tableNames = require('../../constant/tableNames');
const schemaItem = require('./items.schema.json');

class Item extends Model {
    static get tableName() {
        return tableNames.item;
    }

    static get jsonSchema() {
        return schemaItem;
    }

}

module.exports = Item;
