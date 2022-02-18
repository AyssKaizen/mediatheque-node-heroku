exports.up = (knex) => {
    return knex.schema
        .createTable('genre', function (table) {
            table.increments('ge_id');
            table.string('ge_name', 128).notNullable();
        });
    };

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('genre');
};