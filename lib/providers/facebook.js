const Request = require('request-promise-native');
const User = require('../models/user');

module.exports = function fetchUser(token) {
  return Request({
    url: `https://graph.facebook.com/me?fields=picture,name&access_token=${token}`
  })
  .then((data) => JSON.parse(data))
  .then(({ id, name, picture }) => {
    picture = picture.data.url;

    User
      .findByOAuthProvider('facebook', id)
      .then((user) => {
        if (user) { return user; }

        // create user
        return User
          .forge({
            auth_providers: { 'facebook': id },
            name,
            picture
          })
          .save();
      })
  });
}
