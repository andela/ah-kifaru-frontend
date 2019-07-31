describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });
});

describe('Successfully visit a page', () => {
  it('Visits the ErrorSwag API base', () => {
    cy.request('https://errorswag-staging.herokuapp.com/welcome');
  });
});
