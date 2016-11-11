let bookshelf = require('../bookshelf');

let Session = bookshelf.Model.extend({
  tableName: 'sessions'
}, {
  findByUserId(userId) {
    // e.g. (facebook, qwer-1234)
    return Session.query('where', 'user_id', '=', userId).fetch();
  }
});

module.exports = Session;
