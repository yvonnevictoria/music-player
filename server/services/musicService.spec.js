'use strict';

const test = require('ava');
const sinon = require('sinon');
const nock = require('nock');
const { MusicService } = require('./musicService');
const sandbox = sinon.createSandbox();

test.before(async () => {
    nock.disableNetConnect();
});

test.afterEach.always(async () => {
    sandbox.restore();
    if (!nock.isDone()) {
        t.fail('has outstanding nock mocks');
    }
    nock.cleanAll();
});

test.serial('getTracks | should return top 25 tracks that match the search term', async t => {
    const apiReply = {
        resultCount: 25,
        results: [
            { trackName: 'Test track' },
            { trackName: 'Test track2' }
        ]
    };

    nock(`https://itunes.apple.com/search`)
        .get(`?term=elvis+presley&limit=25&media=music`)
        .reply(200, apiReply);

    const tracks = await MusicService.getTracks({ searchTerm: 'elvis presley' });

    t.deepEqual(tracks, [
        { trackName: 'Test track' },
        { trackName: 'Test track2' }
    ]);
});

test.serial(`getTracks | should throw NOT_FOUND error if search term returns no results`, async t => {
    const apiReply = {
        resultCount: 0,
        results: []
    };

    nock(`https://itunes.apple.com/search`)
        .get(`?term=elvis+presley&limit=25&media=music`)
        .reply(200, apiReply);

    const err = await t.throwsAsync(MusicService.getTracks({ searchTerm: 'elvis presley' }));

    t.is(err.message, 'NOT_FOUND');
});
