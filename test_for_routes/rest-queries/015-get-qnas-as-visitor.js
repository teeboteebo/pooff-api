module.exports = ({ expect, response, assert }) => ({
  path: 'qnas',
  method: 'get',

  test() {
    expect(response.nonJSON).to.not.equal('Page not found.')
    assert(response.length > 0)
  }
})
