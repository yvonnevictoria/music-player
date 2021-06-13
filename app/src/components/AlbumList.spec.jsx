import React from 'react';
import { shallow } from 'enzyme';
import { AlbumList } from './AlbumList';

describe('AlbumList', () => {
    let wrapper;

    const requiredProps = {
        songPlaying: { trackId: 0, collectionId: 0 },
        album: {
            name: 'In Between Dreams',
            artwork: 'www.album.com/artwork',
            tracks: [
                {
                    artistName: 'Jack Johnson 1',
                    trackName: 'Banana Pancakes 1',
                    trackId: '12345671'
                },
                {
                    artistName: 'Jack Johnson 2',
                    trackName: 'Banana Pancakes 2',
                    trackId: '12345672'
                },
                {
                    artistName: 'Jack Johnson 3',
                    trackName: 'Banana Pancakes 3',
                    trackId: '12345673'
                },
                {
                    artistName: 'Jack Johnson 4',
                    trackName: 'Banana Pancakes 4',
                    trackId: '12345674'
                }
            ]
        },
        getAlbum: jest.fn()
    };

    beforeEach(() => {
        wrapper = shallow(<AlbumList {...requiredProps} />);
    });

    it('should render image and album name', () => {
        expect(wrapper.find('img').length).toBe(1);
        expect(wrapper.find('img').prop('src')).toBe('www.album.com/artwork');

        expect(wrapper.find('.album-name').length).toBe(1);
        expect(wrapper.find('.album-name').text()).toBe('In Between Dreams');
    });

    it('should render recieved tracks', () => {
        expect(wrapper.find('.album-track').length).toBe(4);
        expect(wrapper.find('.album-track').at(0).text()).toBe('Banana Pancakes 1 | Jack Johnson 1');
        expect(wrapper.find('.album-track').at(1).text()).toBe('Banana Pancakes 2 | Jack Johnson 2');
        expect(wrapper.find('.album-track').at(2).text()).toBe('Banana Pancakes 3 | Jack Johnson 3');
        expect(wrapper.find('.album-track').at(3).text()).toBe('Banana Pancakes 4 | Jack Johnson 4');
    });
});
