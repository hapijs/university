'use strict';

const Lab = require('lab');
const Code = require('code');

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

const University = require('../lib');

const internals = {};

internals.serverConfigs = {
    server: {
        port: 0
    }
};


describe('/version', () => {

    it('success', { parallel: false }, async () => {

        const server = await University.init(internals.serverConfigs);

        expect(server).to.be.an.object();

        const request = { method: 'GET', url: '/version', headers: { authorization: 'Bearer 1234574' } };

        const res = await server.inject(request);

        expect(res.result.message).to.equal('options.message now passed using server.app.message');
        expect(res.result.version).to.equal('0.1.6');

        await server.stop();
    });

    it('fails bad token', { parallel: false }, async () => {

        const server = await University.init(internals.serverConfigs);

        expect(server).to.be.an.object();

        const request = { method: 'GET', url: '/version', headers: { authorization: 'Bearer 1234566' } };

        const res = await server.inject(request);

        expect(res.result.message).to.equal('Bad token');

        await server.stop();
    });
});
