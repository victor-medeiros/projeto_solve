exports.up = knex => knex.schema.createTable('user', table => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('picture').notNullable();
    table.boolean('professional').defaultTo(false)
    table.string('profile_description');
})

exports.down = knex => knex.schema.dropTable('user');
