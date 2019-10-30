module.exports = ({ expect, response }) => ({
  path: 'login',
  method: 'post',
  body: {
    username: 'Torgny Skida',
    password: '121212'
  },
  test() {
    expect(response.username).to.equal('Torgny Skida')
  }
})
