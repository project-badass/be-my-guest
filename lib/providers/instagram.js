const Request = require('request-promise-native');
const User = require('../models/user');

module.exports = function fetchUser(token) {
  return Request({
    url: `https://api.instagram.com/v1/users/self/?access_token=${token}`
  })
  .then((data) => JSON.parse(data))
  .then(({data: {id, full_name/*, profile_picture*/}}) => {
    User
      .findByOAuthProvider('instagram', id)
      .then((user) => {
        if (user) { return user; }

        // create user
        return User
          .forge({
            auth_providers: { 'instagram': id },
            name: full_name
          })
          .save();
      })
  });
}
