module.exports = ({ expect, response }) => ({
  path: 'login',
  method: 'post',
  body: {
    username: 'HammerBoy',
    password: '123456'
  },
  test() {
    expect(response.username).to.equal('HammerBoy')
  }
})
