/// <reference types="cypress" />
describe('Second Suite ', () => {
  it('First test of second suite', () => {
    expect('Hi').to.eql('Hi')
  })
  it('second test', () => {
    expect('Hello world').to.eql('Hello world')
  })
})
