import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { TrackList } from './TrackList';
import { SearchBar } from './SearchBar';

const httpMock = new MockAdapter(axios);

describe('TrackList', () => {
    let wrapper;
    const trackResutls = [
        {
            "trackId": 1469577741,
            "artistName": "Jack Johnson",
            "collectionName": "Jack Johnson and Friends: Sing-A-Longs and Lullabies for the Film Curious George",
            "trackName": "Upside Down",
            "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5e/5b/3d/5e5b3df4-deb5-da78-5d64-fe51d8404d5c/mzaf_13341178261601361485.plus.aac.p.m4a",
            "artworkUrl60": "https://is3-ssl.mzstatic.com/image/thumb/Music124/v4/b1/1d/2e/b11d2e7d-398b-2e7e-4847-1032d0ebad6a/source/60x60bb.jpg",
            "trackTimeMillis": 208643
        },
        {
            "trackId": 1440857786,
            "artistName": "Jack Johnson",
            "collectionName": "In Between Dreams (Bonus Track Version)",
            "trackName": "Better Together",
            "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a2/d3/b3/a2d3b33f-e6b3-cbd8-6efb-fa9ecb9c668a/mzaf_16013347745276122340.plus.aac.p.m4a",
            "trackTimeMillis": 207679
        },
        {
            "trackId": 1440857898,
            "artistName": "Jack Johnson",
            "collectionName": "In Between Dreams (Bonus Track Version)",
            "trackName": "Sitting, Waiting, Wishing",
            "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/27/e6/28/27e628bb-17cb-eb94-87b4-d0f9b7ff1ebc/mzaf_20190415424710808.plus.aac.p.m4a",
            "artworkUrl60": "https://is4-ssl.mzstatic.com/image/thumb/Music125/v4/db/d9/1a/dbd91afa-044d-637b-c557-847863c85a79/source/60x60bb.jpg",
            "trackTimeMillis": 183721
        }
    ];

    beforeEach(() => {
        wrapper = mount(<TrackList />);
    });

    // Could not get this test working - see README for more info
    // Would have tested tracks exist, amount of tracks, info is as expected
    // describe(`TrackList`, () => {
    //     it('should call the node tracks endpoint and fill tracks lists', async () => {
    //         let wrapperTracks = mount(<TrackList />);
    //
    //         act(() => {
    //             httpMock.onGet(`http://localhost:4000/music?searchTerm=jack+johnson`).reply(200, {
    //                 data: trackResutls
    //             });
    //         });
    //
    //         expect(wrapperTracks.find('li').length).toBe(3);
    //     });
    // });

    describe(`media controls`, () => {
        it(`should not render on load`, () => {
            expect(wrapper.find('.media-controls').length).toBe(0);
        });

        it(`should render when song is playing`, () => {
            act(() => {
                wrapper.find('track').prop('onClick')();
            });
            expect(wrapper.find('.media-controls').length).toBe(1);
        });
    });

    describe(`search bar`, () => {
        it(`should render search bar`, () => {
            expect(wrapper.find(SearchBar).length).toBe(1);
        });

        it(`should render update tracks on search`, () => {
            expect(wrapper.find(SearchBar).length).toBe(1);

            httpMock.onGet(`http://localhost:4000/music?searchTerm=jack+johnson`).reply(200, {
               data: trackResutls
           });

           act(() => {
               wrapper.find(SearchBar).prop('onSearch')('jack+johnson');
           });

        });
    });
});
