module.exports = ({ expect, response }) => ({
  path: 'users',
  method: 'post',
  body: {
    personId: '123456-0000',
    username: 'anvandare1',
    password: '111111',
    firstName: 'användare',
    lastName: 'et',
    email: 'anvandare@gmail.com',
    phone: '0738111111'
  },
  test() {
    expect(response.success).to.equal('User created')
  }
})
