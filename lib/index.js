var Hapi = require('hapi');
var Hoek = require('hoek');
var Package = require('../package.json');

var internals = {
    port: 8000,
    responses: {
        version: {
            version: Package.version
        }
    }
};

internals.Server = function () {
    
    this.server = new Hapi.Server();
    this.server.connection({ port: internals.port });
    
    this.server.route({
        method: 'GET',
        path: '/version',
        config: {
            description: 'Provide application version',
            handler: function (request, reply) {
                
                return reply(internals.responses.version);
            }
        }
    });
    
    var self = this;
    this.server.start(function (err) {
        
        Hoek.assert(!err, err);
        console.log('Started server on port: ' + self.server.info.port);
    });    
};

internals.server = new internals.Server();
