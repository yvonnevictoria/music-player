import React from 'react';
import { shallow } from 'enzyme';
import { MusicPlayer } from './MusicPlayer';
import { TrackList } from './TrackList';
import { AlbumList } from './AlbumList';

describe('MusicPlayer', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<MusicPlayer />);
    });

    it('should render TrackList', () => {
        expect(wrapper.find(TrackList).length).toBe(1);
    });

    it('should render not AlbumList if no songs playing', () => {
        expect(wrapper.find(AlbumList).length).toBe(0);
    });

    it('should render AlbumList if song is playing', () => {
        wrapper.find(TrackList).prop('setSongPlaying')({ trackId: 5473, collectionId: 9886 });
        expect(wrapper.find(AlbumList).length).toBe(1);
    });
});
