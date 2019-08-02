import store from '../src/store/index';

describe('Test REDUX STORE', () => {
  it('test redux store', () => {
    expect(store).toMatchSnapshot();
  });
});
