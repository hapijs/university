exports.register = function (server, options, next) {

    server.route({
          method: 'GET',
          path: '/version',
          config: {
              description: 'Returns the version of the server',
              handler: function (request, reply) {

                  return reply({ version: options.version });
              }
          }
    });

    next();
};

exports.register.attributes = {
  name: 'version',
  version: '0.1'
};
