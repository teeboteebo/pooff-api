module.exports = ({ expect, response, store }) => ({
  path: 'transactions',
  method: 'post',
  body: {
    receiver: store.userOnePhone,
    amount: 201,
    message: 'Vassego PappiJävel!'
  },

  test() {
    expect(response.nonJSON).to.equal('Not enough funds')
  }
})
