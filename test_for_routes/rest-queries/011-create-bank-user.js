module.exports = ({ expect, response }) => ({
  path: 'users',
  method: 'post',
  body: {
    personId: '123456-9999',
    username: 'Bank',
    password: '999999',
    role: 'bank',
    firstName: 'DonBank',
    lastName: 'Rich',
    email: 'donbank@gmail.com',
    phone: '0738999999'
  },
  test() {
    expect(response.success).to.equal('User created')
  }
})
