let knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});
let bookshelf = require('bookshelf')(knex);

bookshelf.plugin(require('bookshelf-json-columns'));

module.exports = bookshelf;
