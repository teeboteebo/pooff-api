module.exports = ({ expect, response }) => ({
  path: 'godaddy',
  method: 'put',
  body: {
    personId: '123456-3333',
    username: 'anvandare2',
    password: '333333',
    firstName: 'användare',
    lastName: 'tva',
    email: 'anvandare3@gmail.com',
    phone: '0738333333'
  },
  test() {
    expect(response.success).to.equal('User created')
  }
})
