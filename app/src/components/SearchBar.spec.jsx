import React from 'react';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
    let wrapper;
    const requiredProps = {
        searchTerm: 'elvis',
        onChange: jest.fn(),
        onSearch: jest.fn()
     };

    beforeEach(() => {
        wrapper = shallow(<SearchBar {...requiredProps} />);
    });

    it('should render input and label', () => {
        expect(wrapper.find('label').text()).toBe('Search music:');
        expect(wrapper.find('input').length).toBe(1);
    });

    it('should render button', () => {
        expect(wrapper.find('button').text()).toBe('Search');
    });

    it('should call onSearch when button is pressed', () => {
        act(() => {
            wrapper.find('button').prop('onClick')();
        });

        // TODO YVO: Broken because of () => {}
        expect(requiredProps.onSearch).toHaveBeenCalledTimes(1);
    });

    it('should render call onChange when input value is change', () => {
        act(() => {
            wrapper.find('input').prop('onChange')('bla');
        });
        expect(requiredProps.onChange).toHaveBeenCalledTimes(1);
    });
});
