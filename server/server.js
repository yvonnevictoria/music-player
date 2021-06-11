'use strict';
const MusicHandler = require('./handlers/musicHandler');

const Hapi = require('@hapi/hapi');

const server = Hapi.server({
    port: 4000,
    host: 'localhost',
    routes: {
        cors: true
    }
});

const init = async () => {
    server.route({
        method: 'GET',
        path: '/music',
        handler: MusicHandler.getMusicBySearchTerm
    });

    server.route({
        method: 'GET',
        path: '/album/{id}',
        handler: MusicHandler.getAlbum
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();

module.exports = server;
