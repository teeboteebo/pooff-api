module.exports = ({ expect, response }) => ({
  path: 'login',
  method: 'post',
  body: {
    username: 'anvandare1',
    password: '111111'
  },
  test() {
    expect(response.role).to.equal('parent')
    expect(response.username).to.equal('anvandare1')
    expect(response._id).to.be.a('string')
  }
})
