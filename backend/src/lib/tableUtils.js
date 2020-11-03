const tableName = require('../../src/constant/tableNames');

function addDefaultColumns(table) {
    table.timestamps(false, true);
    table.dateTime('delete_at').nullable();
}

function createNameTable(knex, table_name) {
    return knex.schema.withSchema(tableName.schema_name).createTable(table_name, (table) => {
        table.increments().primary().notNullable();
        table.string('name').notNullable().unique();
        addDefaultColumns(table);
    });
}

/**
 *
 * @param table reference object
 * @param tableName name of table
 * @param notNullable is the table permit the fk null or not
 */
function references(table, tableName, notNullable = true, columnName = '') {
    const definitionTable = table
        .integer(`${columnName || tableName}_id`)
        .unsigned()
        .references('id').inTable(tableName)
        .onDelete('cascade');

    if(notNullable) {
        definitionTable.notNullable();
    }
}

function columnUrl(table, columnName) {
    table.string(columnName, 1000);
}

function emailColumn(table, columnName) {
    return table.string(columnName, 254);
}

module.exports = {
    addDefaultColumns,
    emailColumn,
    columnUrl,
    references,
    createNameTable
}
