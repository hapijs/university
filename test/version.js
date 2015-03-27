// Load modules

var Code = require('code');
var Lab = require('lab');
var Server = require('../lib');
var Pkg = require('../package.json');

// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var it = lab.test;
var expect = Code.expect;

describe('version', function () {

    it('gets the version', function (done) {

        Server.init(4000, function(err, server) {

            server.inject('/version', function(response) {

                expect(response.statusCode).to.equal(200);
                expect(response.result.version).to.equal(Pkg.version);
                server.stop(done);
            });
        });
    });
});
