exports.up = (knex) => {
    return knex.schema
        .createTable('medias', function (table) {
            table.increments('me_id');
            table.string('me_title', 128).notNullable();
            table.string('me_release_date', 128).notNullable();
            table.string('me_image', 128);
            table.string('me_author').notNullable();
            table.integer('me_type').references('ty_id').inTable('type');
            table.integer('me_genre').references('ge_id').inTable('genre');
        });
    };

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('medias');
};

