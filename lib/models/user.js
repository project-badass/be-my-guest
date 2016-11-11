let bookshelf = require('../bookshelf');

let User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true
}, {
  jsonColumns: ['auth_providers'],
  findByOAuthProvider(provider, id) {
    // e.g. (facebook, qwer-1234)
    return User.query('where', 'auth_providers', '@>', {[provider]: id}).fetch();
  }
});

module.exports = User;
