const tableName = require('../../src/constant/tableNames');

function addDefaultColumns(table) {
    table.timestamps(false, true);
    table.dateTime('delete_at').nullable();
}

function createNameTable(knex, table_name) {
    return knex.schema.createTable(table_name, (table) => {
        table.increments().notNullable().primary();
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

/**
 * @param {import('knex')} knex
 */
exports.up = async (knex) => {

    await Promise.all([
            knex.schema.createTable(tableName.user, (table) => {
                table.increments().notNullable().primary();
                emailColumn(table,'email', 254).notNullable().unique();
                table.string('name').notNullable();
                table.string('password', 50).notNullable();
                table.dateTime('last_login').nullable();
                addDefaultColumns(table);
                }),
            createNameTable(knex, tableName.item_type),
            createNameTable(knex, tableName.country),
            createNameTable(knex, tableName.state),
            createNameTable(knex, tableName.shape),
            knex.schema.createTable(tableName.location, (table) => {
                table.increments().notNullable().primary();
                table.string('name').notNullable().unique();
                table.string('description', 750);
                columnUrl(table, 'image_url');
                addDefaultColumns(table);
            }),
        ]
    );

    await knex.schema.createTable(tableName.address, (table) => {
        table.increments().notNullable().primary().index();
        table.string('street_address_1', 100).notNullable();
        table.string('street_address_2', 100);
        table.string('city', 100).notNullable();
        table.string('zipcode', 20).notNullable();
        table.float('latitude').notNullable();
        table.float('longitude').notNullable();
        references(table, 'state' );
        references(table, 'country');
    });

    await knex.schema.createTable(tableName.manufacturer, (table) => {
        table.increments().notNullable().primary().index();
        table.string('name').notNullable();
        columnUrl(table, 'logo_url');
        table.string('description',1000);
        //table.string('type');
        columnUrl(table, 'website_url');
        emailColumn(table,'email', 254).notNullable();
        references(table, 'address' );
    });

};

exports.down = async (knex) => {
    await Promise.all([
        tableName.manufacturer,
        tableName.address,
        tableName.user,
        tableName.item_type,
        tableName.country,
        tableName.state,
        tableName.shape,
        tableName.location,
        tableName.address
    ].map((tableName) => knex.schema.dropTableIfExists(tableName))
    );
};
