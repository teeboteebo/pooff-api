module.exports = ({ expect, response }) => ({
  path: 'transactions',
  method: 'post',
  body: {
    receiver: '0738111111',
    amount: 40000,
    message: 'Pappabank fyller på kontot!'
  },
  test() {
    expect(response.nonJSON).to.equal('Success')
  }
})
