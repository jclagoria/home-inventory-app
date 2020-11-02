function addDefaultColumns(table) {
    table.timestamps(false, true);
    table.dateTime('delete_at').nullable();
}

function createNameTable(knex, table_name) {
    return knex.schema.createTable(table_name, (table) => {
        table.increments().notNullable().primary().index(table_name+"_index");
        table.string('name').notNullable().unique();
        addDefaultColumns(table);
    });
}

function references(table, tableName) {
    table.integer(`${tableName}_id`).unsigned()
        .references('id').inTable(tableName).onDelete('cascade');
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
