import store from '../src/store/index';

describe('Test STORE', () => {
  it('test redux store', () => {
    expect(store).toMatchSnapshot();
  });
});
