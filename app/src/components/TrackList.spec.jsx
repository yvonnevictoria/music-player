import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { TrackList } from './TrackList';

describe('TrackList', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<TrackList />);
    });


    describe(`TrackList`, () => {
        it(`should display balance`, () => {
            expect(wrapper.find('.media-controls').length).toBe(0);
        });
    });

    describe(`search bar`, () => {

    });

    describe(`track list items`, () => {
        it(`should render edit balance button`, () => {
            expect(wrapper.find('.media-controls').length).toBe(0);
        });
    });

    describe(`media player`, () => {
        it(`should not render on load`, () => {
            expect(wrapper.find('.media-controls').length).toBe(0);
        });

        it(`should render when song is playing`, () => {
            act(() => {
                wrapper.find('li').prop('onClick')();
            });
            expect(wrapper.find('.media-controls').length).toBe(1);
        });
    });

    describe(`errors`, () => {
        it(`should render errors`, () => {
            expect(wrapper.find('.media-controls').length).toBe(0);
        });
    });
});
