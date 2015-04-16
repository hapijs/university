// Q: Start.js - Why is this required over just index.js?
// A: Because you don't want to expose the automatic server creation as an API.

var Hoek = require('hoek');

// Requiring './lib' like this assigns the `register` & `init` methods to the variable `lib`.
var lib = require('./index');

// port and the callback are called
lib.init(8000, function (err, server) {


    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
});
