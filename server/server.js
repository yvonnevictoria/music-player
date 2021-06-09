'use strict';
const MusicHandler = require('./handlers/musicHandler');

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 4000,
        host: 'localhost',
        routes: {
            cors: true
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: MusicHandler.hello
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
