const ROLLBAR_ACCESS_TOKEN = process.env.ROLLBAR_ACCESS_TOKEN;


// OPBEAT METRICS /////
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

require('opbeat').start({
  filter: function(error, payload) {
    delete payload.http.headers.authorization;
    delete payload.http.headers.referer;

    return payload;
  }
});
// OPBEAT METRICS /////



let manifest = {
  'connections': [{
    'port': process.env.PORT || 3000,
    'routes': {
      'security': true,
      'cors': {
        'credentials': true,
        'additionalHeaders': ['x-origin', 'x-heroku-sudo', 'x-heroku-sudo-user', 'if-modified-since', 'x-heroku-sudo-reason']
      },
      'state': {
        'parse': false,
        'failAction': 'ignore'
      }
    }
  }],

  server:{
    mime: {
      override: {
        'text/event-stream': {
          compressible: false
        }
      }
    }
  },

  'registrations': [
    { 'plugin': './ping' },
    { 'plugin': './announce-server-ready' }
  ]
};


if (process.env.NODE_ENV === 'production') {
  manifest.registrations.push({ 'plugin': 'hapi-require-https' });
}


if (ROLLBAR_ACCESS_TOKEN) {
  manifest.registrations.push({
    'plugin': {
      'register': './report-uncaught-exceptions/node_modules/icecreambar',
      'options': {
        'accessToken': ROLLBAR_ACCESS_TOKEN,
        'scrubHeaders': ['authorization', 'referer'],
        'omittedResponseCodes': [401, 404]
      }
    }
  },
  {
    'plugin': './report-uncaught-exceptions'
  });
}


module.exports = manifest;
