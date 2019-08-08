import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from './enzyme';
import Footer from '../src/components/Footer/Footer';

describe('Footer layout', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Footer />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
