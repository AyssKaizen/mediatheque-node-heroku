exports.up = (knex) => {
    return knex.schema
        .createTable('type', function (table) {
            table.increments('ty_id');
            table.string('ty_name', 128).notNullable();
        });
    };

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('type');
};