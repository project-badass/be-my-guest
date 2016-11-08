# ping
Implements a single endpoint, `/ping`, which responds with a 200 status.

## how to use
Register in a hapijs server that you'd like to implement a `/ping` endpoint.

## what it does
Responds to http(s) requests to `/ping` with a 200 status. This is useful when configuring an uptime alert system such as Pingdom or Newrelic.

## options
+ `path` - [optional] let's you specify a path other than `/ping`.

## usage
```js
/* with defaults */
server.register(require('uku-ping-endpoint'), (err) => {

  if (err) { throw err; }

  /* your application goes here*/
});

/* with options */
server.register({
  register: require('uku-ping-endpoint'),
  options: { path: '/health' }
}, (err) => {

  if (err) { throw err; }

  /* your application goes here*/
});
```
```sh
curl http://localhost:3000/ping
```
