const { Model }  = require('objection');

const tableNames = require('../../../constant/tableNames');
const schemaShape = require('./shape.schema.json');

class Shape extends Model {
    static get tableName() {
        return tableNames.shape;
    }

    static get jsonSchema() {
        return schemaShape;
    }

}

module.exports = Shape;
