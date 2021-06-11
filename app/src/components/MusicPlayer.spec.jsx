import React from 'react';
import { shallow } from 'enzyme';
import { MusicPlayer } from './MusicPlayer';

describe('MusicPlayer', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<MusicPlayer />);
    });

    it('should render TrackList', () => {
        expect(wrapper.find('TrackList').length).toBe(1);
    });
});
