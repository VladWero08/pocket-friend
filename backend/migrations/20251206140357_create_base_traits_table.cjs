
exports.up = function (knex) {
    return knex.schema.createTable('base_traits', function (table) {
        table.increments('id').primary();
        table.string('name', 50).notNullable();
        table.text('description').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('base_traits');
};