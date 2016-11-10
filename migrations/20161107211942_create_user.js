exports.up = function(knex/*, Promise*/) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('email');
    table.string('name');
    table.string('credential_salt');
    table.string('credential_hash');
    table.jsonb('auth_providers');   // { 'facebook': 'qwer-1234', 'google': 'asdf-5678', 'instagram': 'zxcv-90210'}
    table.timestamps();
  });
};

exports.down = function(knex/*, Promise*/) {
  return knex.schema.dropTable('users');
};
