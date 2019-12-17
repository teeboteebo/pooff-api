module.exports = ({ expect, response }) => ({
  path: 'myuser',
  method: 'put',
  body: {
    lastName: 'ett'
  },

  test() {
    expect(response.lastName).to.equal('ett')
  }
})
