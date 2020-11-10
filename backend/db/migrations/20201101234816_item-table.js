const tableName = require('../../src/constant/tableNames');

const {
    addDefaultColumns,
    columnUrl,
    references
} = require('../../src/lib/tableUtils');

/**
 * @param {import('knex')} knex
 */
exports.up = async (knex) => {

    await knex.schema.table(tableName.country, (table) => {
        table.string('code').notNullable();
    });

    await knex.schema.table(tableName.state, (table) => {
        table.string('code').notNullable();
        references(table, tableName.country)
    });

    await knex.schema.createTable(tableName.size, (table) => {
        table.increments().primary().notNullable();
        table.string('name').notNullable();
        table.decimal('length').unsigned();
        table.decimal('width').unsigned();
        table.decimal('height').unsigned();
        table.decimal('volume').unsigned();
        references(table, tableName.shape);
        addDefaultColumns(table);
    });

    await knex.schema.createTable(tableName.item, (table) => {
        table.increments().primary().notNullable();
        references(table, tableName.user);
        table.string('name', 500);
        references(table, tableName.item_type);
        table.string('description', 750);
        references(table, tableName.company);
        references(table, tableName.size);
        table.string('sku', 250);
        table.boolean('sparks_joy').defaultTo(true);
        addDefaultColumns(table);
    });

    await knex.schema.createTable(tableName.item_info, (table) => {
        table.increments().primary().notNullable();
        references(table, tableName.user);
        references(table, tableName.item);
        table.dateTime('purchase_date').notNullable();
        table.dateTime('expiration_date');
        references(table, tableName.company, false, 'retailer')
        table.dateTime('last_used');
        table.decimal('purchase_price').notNullable().defaultTo(0.00);
        !table.decimal('msr_price').notNullable().defaultTo(0);
        references(table, tableName.inventory_location);
        addDefaultColumns(table);
    });

    await knex.schema.createTable(tableName.item_image, (table) => {
        table.increments().primary().notNullable();
        references(table, tableName.item);
        columnUrl(table, 'imagen_url');
        addDefaultColumns(table);
    });

    await knex.schema.createTable(tableName.related_item, (table) => {
        table.increments().primary().notNullable();
        references(table, tableName.item);
        references(table, tableName.item, false, 'related_item');
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
        tableName.size,
        tableName.item,
        tableName.item_info,
        tableName.item_image,
        tableName.related_item
    ]
        .reverse().map((name) => knex
            .schema.dropTableIfExists(name)));
};
