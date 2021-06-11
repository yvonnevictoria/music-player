import React from 'react';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { MediaControls } from './MediaControls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

describe('MediaControls', () => {
    let wrapper;

    const requiredProps = {
        audio: {
            url: 'www.playing.com',
            playing: true
        },
        setAudio: jest.fn()
    };

    beforeEach(() => {
        wrapper = shallow(<MediaControls {...requiredProps} />);
    });

    it('should render pause when playing is true', () => {
        expect(wrapper.find('button').length).toBe(1);
        expect(wrapper.find(FontAwesomeIcon).prop('icon').iconName).toBe('pause');
    });

    it('should render play when playing is false', () => {
        act(() => {
            wrapper.setProps({ audio: { ...requiredProps.audio, playing: false } });
        });
        expect(wrapper.find('button').length).toBe(1);
        expect(wrapper.find(FontAwesomeIcon).prop('icon').iconName).toBe('play');
    });

    it('should render call setAudio when button is pressed', () => {
        act(() => {
            wrapper.find('button').prop('onClick')();
        });
        expect(requiredProps.setAudio).toHaveBeenCalledTimes(1);
    });


});
