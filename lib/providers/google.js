const Request = require('request-promise-native');
const User = require('../models/user');

module.exports = function fetchUser(token) {
  return Request({
    url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then((data) => JSON.parse(data))
  .then(({id, email, name/*, picture*/}) => {
    User
      .findByOAuthProvider('google', id)
      .then((user) => {
        if (user) { return user; }

        // create user
        return User
          .forge({
            auth_providers: { 'google': id },
            email,
            name
          })
          .save();
      })
  });
}
