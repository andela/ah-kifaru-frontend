import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from './enzyme';
import Auth from '../src/components/auth';


describe('Application test', () => {
  it('should renders without crashing', () => {
    const wrapper = mount(<Auth />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('a').length).toBeGreaterThan(1);
    expect(wrapper.find('a')).toHaveLength(2);
    expect(wrapper.find('[href="/login"]')).toHaveLength(1);
    expect(wrapper.find('[href="/signup"]')).toHaveLength(1);
  });
});