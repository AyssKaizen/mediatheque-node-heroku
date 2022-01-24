exports.up = (knex) => {
    return knex.schema
        .createTable('users', function (table) {
            table.increments('us_id');
            table.string('us_lastname', 128).notNullable();
            table.string('us_firstname', 128).notNullable();
            table.string('us_email', 128).notNullable();
            table.date('us_birthday');
            table.string('us_address', 128).notNullable();
            table.string('us_city', 128).notNullable();
            table.string('us_postcode', 128).notNullable();
            table.boolean('us_active');
            table.string('us_password', 128).notNullable();
            table.boolean('us_admin');
        });
    };

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('users');
};

