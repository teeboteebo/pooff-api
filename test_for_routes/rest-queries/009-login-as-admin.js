module.exports = ({ expect, response }) => ({
  path: 'login',
  method: 'post',
  body: {
    username: 'POOFFadmin',
    password: 'admin1337'
  },
  test() {
    expect(response.role).to.equal('admin')
    expect(response.username).to.equal('POOFFadmin')
    expect(response._id).to.be.a('string')
  }
})
