exports.up = knex => knex.schema.createTable('service', table => {
      table.increments('id');
      table.integer('client_id').notNullable().unsigned();
      table.integer('professional_id').unsigned();
      table.datetime('dateTime');
      table.decimal('price');
      table.string('request');
      table.string('solution');
      table.string('status');
      table.integer('rate');

      table.foreign('client_id').references('user.id');
      table.foreign('professional_id').references('user.id');
  });

exports.down = knex => knex.schema.dropTable('service');
