const Joi = require('joi');
const User = require('../../lib/models/user');
const Session = require('../../lib/models/session');

exports.register = function (server, options, next) {

  // TODO return proper schema --
  // { authorization: { token: 'asdf-1234' } }
  server.route({
    method: 'post',
    path: '/login',
    config: {
      validate: {
        payload: {
          provider: Joi.string().required(),
          token: Joi.string().required()
        }
      }
    },
    handler: (request, reply) => {
      let provider = request.payload.provider;
      let token = request.payload.token;

      // query for user id from _provider_ using _token_
      // WARNING huge security issue trusting user input here
      let oauthProvider = require(`../../lib/providers/${provider}`);
      oauthProvider(token).then(({id}) => {
        // the resulting record's `id` is the user id
        // look for an existing Session, return if found
        // TODO -- return authorization: { token: id }
        Session.findByUserId(id)
          .then((session) => {
            reply(session).code(200);
          })
          .catch((/*err*/) => {
            // otherwise create a new session for this user
            Session.forge({ user_id: id })
              .save()
              .then((session) => {
                // and return it
                reply(session).code(201);
              });
          })
      });
    }
  });

  // TODO use the Authorization header rather than a parameter
  server.route({
    method: 'delete',
    path: '/login/{sessionId}',
    config: {
      validate: {
        params: {
          'sessionId': Joi.string().required()
        }
      }
    },
    handler: (request, reply) => {
      new Session({id: request.params.sessionId})
        .destroy()
        .then((/*session*/) => {
          reply().code(204);
        });
    }
  });

  next();
};

exports.register.attributes = {
  name: 'session',
  version: '1'
};
