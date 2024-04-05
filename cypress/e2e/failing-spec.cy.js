/// <reference types="cypress" />
describe('Second failing Suite ', () => {
  it('First test of second failing suite', () => {
    expect('Hello').to.eql('Hi')
  })
  it('second test of second failing suite', () => {
    expect('Hi world').to.eql('Hello world')
  })
})
