import React from 'react';
import toJson from 'enzyme-to-json';
import App from '../src/components/App';
import { shallow, mount } from './enzyme';
import HomePage from '../src/pages/hompage';
import Routes from '../src/routes/AppRouter';
import Menu from '../src/components/userMenu';
import Footer from '../src/components/Footer/Footer';

describe('Application test', () => {
  it('should work fine on App', () => {
    const wrapper = shallow(<App />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should work fine Home Page', () => {
    const wrapper = shallow(<HomePage />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should work fine on Routes', () => {
    const wrapper = shallow(<Routes />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render without crashing', () => {
    const wrapper = mount(<Menu />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('[href="/"]')).toHaveLength(4);
    expect(wrapper.find('a').length).toBeGreaterThan(1);
    expect(wrapper.find('ul')).toHaveLength(1);
    expect(wrapper.find('li').length).toBeGreaterThan(1);
  });
  it('should render without crashing', () => {
    const wrapper = shallow(<Footer />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
