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

    await Promise.all([
            knex.schema.createTable(tableName.user, (table) => {
                table.increments().primary().notNullable();
                emailColumn(table,'email', 254).notNullable().unique();
                table.string('name').notNullable();
                table.string('password', 100).notNullable();
                table.dateTime('last_login').nullable();
                addDefaultColumns(table);
                }),
            createNameTable(knex, tableName.item_type),
            createNameTable(knex, tableName.country),
            createNameTable(knex, tableName.state),
            createNameTable(knex, tableName.shape),
            knex.schema.createTable(tableName.inventory_location, (table) => {
                table.increments().primary().notNullable();
                table.string('name').notNullable().unique();
                table.string('description', 750);
                columnUrl(table, 'image_url');
                addDefaultColumns(table);
            }),
        ]
    );

    await knex.schema.createTable(tableName.address, (table) => {
        table.increments().primary().notNullable();
        table.string('street_address_1', 100).notNullable();
        table.string('street_address_2', 100);
        table.string('city', 100).notNullable();
        table.string('zipcode', 20);
        table.double('latitude');
        table.double('longitude');
        references(table, 'state', true);
        addDefaultColumns(table);
    });

    await knex.schema.createTable(tableName.company, (table) => {
        table.increments().primary().notNullable();
        table.string('name').notNullable();
        columnUrl(table, 'logo_url');
        table.string('description',1000);
        //table.string('type');
        columnUrl(table, 'website_url');
        emailColumn(table,'email', 254).notNullable();
        references(table, 'address', false );
        addDefaultColumns(table);
    });

};

exports.down = async (knex) => {
    await Promise.all([
        tableName.company,
        tableName.address,
        tableName.user,
        tableName.item_type,
        tableName.state,
        tableName.country,
        tableName.shape,
        tableName.inventory_location,
        tableName.address
    ].map((tableName) => knex.schema.dropTableIfExists(tableName))
    );
};
