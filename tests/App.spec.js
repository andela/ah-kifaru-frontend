import React from 'react';
import Jest from 'jest';
import toJson from 'enzyme-to-json';
import App from '../src/components/App';
import { shallow } from './enzyme';
import LoginPage from '../src/pages/loginPage';
import HomePage from '../src/pages/hompage';
import Routes from '../src/routes/AppRouter';

describe('Application test', () => {
  it('should work fine', () => {
    const wrapper = shallow(<App />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should work fine', () => {
    const wrapper = shallow(<LoginPage />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should work fine', () => {
    const wrapper = shallow(<HomePage />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should work fine', () => {
    const wrapper = shallow(<Routes />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
