module.exports = ({ expect, response }) => ({
  path: 'login',
  method: 'post',
  body: {
    username: 'anvandare2',
    password: '333333'
  },
  test() {
    expect(response.role).to.equal('user')
    expect(response.username).to.equal('anvandare2')
    expect(response._id).to.be.a('string')
  }
})
