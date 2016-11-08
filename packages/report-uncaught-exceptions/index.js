const ROLLBAR_SERVER_ITEM_ACCESS_TOKEN = process.env.ROLLBAR_SERVER_ITEM_ACCESS_TOKEN;

function catcher (server, next) {

  if (ROLLBAR_SERVER_ITEM_ACCESS_TOKEN) {
    // this requires that you've registered `icecreambar` without a scope, or explicitly named the scope `default`.
    let rollbar = server.plugins.icecreambar.default;
    rollbar.handleUncaughtExceptions(ROLLBAR_SERVER_ITEM_ACCESS_TOKEN, { exitOnUncaughtException: true });
  } else {
    console.log('ROLLBAR_SERVER_ITEM_ACCESS_TOKEN is not set; Rollbar will _not_ report uncaught exceptions!');
  }

  next();
};

exports.register = function (server, options, next) {

  server.dependency('icecreambar', catcher);
  next();
};

exports.register.attributes = {
  name: 'report-uncaught-exceptions',
  version: '1'
};
