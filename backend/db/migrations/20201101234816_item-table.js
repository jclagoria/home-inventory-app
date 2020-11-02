const tableName = require('../../src/constant/tableNames');

const {
    addDefaultColumns,
    emailColumn,
    columnUrl,
    references,
    createNameTable
} = require('../../src/lib/tableUtils');

/**
 * @param {import('knex')} knex
 */
exports.up = async (knex) => {

    await knex.schema.table(tableName.address, (table) => {
        table.dropColumn('country_id');
    });

    await knex.schema.table(tableName.country, (table) => {
        table.string('code');
    });

    await knex.schema.table(tableName.state, (table) => {
        table.string('code');
        references(table, tableName.country)
    });

    await knex.schema.createTable(tableName.size, (table) => {
        table.increments().notNullable().index(tableName.size+'_index');
        table.string('name').notNullable();
        table.float('length').unsigned();
        table.float('with').unsigned();
        table.float('height').unsigned();
        table.float('volume').unsigned();
        references(table, tableName.shape);
        addDefaultColumns(table);
    });



};

/**
 * @param {import('knex')} knex
 */
exports.down = async (knex) => {
    await knex.schema.table(tableName.state, (table) => {
        table.dropColumn('code');
        table.dropColumn('country_id');
    });

    await knex.schema.table(tableName.country, (table) => {
        table.dropColumn('code');
    });

    await  Promise.all([
        tableName.size
    ]
        .reverse().map((name) => knex
            .schema.dropTableIfExists(name)));

};
