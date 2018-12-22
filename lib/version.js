'use strict';

// Credits: Script based off work by 
// @MylesBorins https://github.com/MylesBorins
// See this PR: https://github.com/hapijs/university/pull/7
// https://github.com/hapijs/university/pull/44

const Package = require('../package.json');

const internals = {};

exports.plugin = {
    name: 'version',
    description: 'example plugin university assignment2',
    register: function (server, options) {

        const version = function (request, h) {

            const response = {
                version: Package.version,
                message: options.message
            };

            return response;
        };

        server.route({
            method: 'GET',
            path: '/version',
            config: {
                description: 'Returns object with version of server and options.message.',
                handler: version
            }
        });
    }
};
