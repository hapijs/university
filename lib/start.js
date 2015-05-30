// Load modules

// Load modules

var Hoek = require('hoek');
var Server = require('./index');
var Auth = require('./auth');

// Declare internals

var internals = {};

internals.manifest = {
    connections: [
        {
            port: 8000
        }
    ],
    plugins: {
        './version': {},
        './private': {},
        './home': {},
        './auth': {},
        'hapi-auth-basic': {}
    }
};

internals.composeOptions = {
    relativeTo: __dirname
};

Server.init(internals.manifest, internals.composeOptions, function (err, server) {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
});
