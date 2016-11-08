const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const Plugin = require('../index');

const expect = Code.expect;
const lab = exports.lab = Lab.script();

let server;

lab.experiment('ping', function () {

  lab.beforeEach(function(done) {

    server = new Hapi.Server();
    server.connection({});
    server.register({ register: Plugin, options: { path: '/foo' }}, done);
  });

  lab.test('responds with a 200 status', function (done) {

    server.inject('/foo', function(response) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});
