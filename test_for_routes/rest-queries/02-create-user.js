module.exports = ({ expect, response }) => ({
  path: 'users',
  method: 'post',
  body: {
    username: 'Torgny Skida',
    password: '121212'
  },
  test() {
    expect(response.success).to.equal('User created')
  }
})
