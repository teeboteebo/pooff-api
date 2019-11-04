module.exports = ({ expect, response, store }) => ({
  path: 'myuser',
  method: 'get',

  test() {
    expect(response.role).to.equal('parent')
    expect(response.children.length).to.be.above(0)
    store.userOneChildPhone = response.children[0].phone
  }
})
