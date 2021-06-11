'use strict';

const test = require('ava');
const server = require('../server');
const sinon = require('sinon');
const { MusicService } = require('../services/musicService');

const sandbox = sinon.createSandbox();

test.afterEach.always(async () => {
    sandbox.restore();
});

test.serial('GET /music | should return top 25 tracks for supplied search term', async t => {
    sandbox.stub(MusicService, 'getTracks').resolves([{ trackName: 'test' }]);

    const request = {
        method: 'GET',
        url: `/music?searchTerm="elvis"`
    };

    const { result, statusCode } = await server.inject(request);
    t.is(statusCode, 200);
    t.deepEqual(result, [{ trackName: 'test' }]);
});

test.serial('GET /music | should throw NOT_FOUND if no results returned for supplied search term', async t => {
    sandbox.stub(MusicService, 'getTracks').rejects(new Error('NOT_FOUND'));

    const request = {
        method: 'GET',
        url: `/music?searchTerm="elvis"`
    };

    const { result, statusCode } = await server.inject(request);
    t.is(statusCode, 404);
    t.is(result, 'No results')
});

test.serial('GET /album | should return album artwork and songs', async t => {
    sandbox.stub(MusicService, 'getAlbum').resolves([{ trackName: 'test' }]);

    const request = {
        method: 'GET',
        url: `/album/12345`
    };

    const { result, statusCode } = await server.inject(request);
    t.is(statusCode, 200);
    t.deepEqual(result, [{ trackName: 'test' }]);
});

test.serial('GET /album | should throw NOT_FOUND if no results returned for supplied search term', async t => {
    sandbox.stub(MusicService, 'getAlbum').rejects(new Error('NOT_FOUND'));

    const request = {
        method: 'GET',
        url: `/album/12345`
    };

    const { result, statusCode } = await server.inject(request);
    t.is(statusCode, 404);
    t.is(result, 'No album results')
});
