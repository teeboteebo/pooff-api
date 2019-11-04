module.exports = ({ expect, response }) => ({
  path: 'myuser',
  method: 'get',

  test() {
    expect(response.role).to.equal('parent')
    expect(response.children.length).to.be.above(0)
  }
})
