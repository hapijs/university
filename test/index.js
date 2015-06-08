// Load modules

var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');
var University = require('../lib');
var Version = require('../lib/version');
var Path = require('path');

//declare internals

var internals = {};

// Test shortcuts

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var it = lab.test;


it('Starts server and returns hapi server object', function (done) {

    University.init({}, {}, function (err, server) {

        expect(err).to.not.exist();
        expect(server).to.be.instanceof(Hapi.Server);

        server.stop(done);
    });
});

it('Starts server on provided port', function (done) {

    University.init({connections: [{port: 5000}]}, {}, function (err, server) {

        expect(err).to.not.exist();
        expect(server.info.port).to.equal(5000);

        server.stop(done);
    });
});

it('Handles register plugin errors', { parallel: false }, function (done) {

    var orig = Version.register;
    Version.register = function (server, options, next) {

        Version.register = orig;
        return next(new Error('register version failed'));
    };

    Version.register.attributes = {
        name: 'fake version'
    };

    University.init(internals.manifest, internals.composeOptions, function (err, server) {

        expect(err).to.exist();
        expect(err.message).to.equal('register version failed');

        done();
    });
});

internals.manifest = {
    connections: [
        {
            port: 0
        }
    ],
    plugins: {
        './version': {}
    }
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
