module.exports = ({ expect, response, store }) => ({
  path: 'transactions',
  method: 'post',
  body: {
    receiver: store.userOneChildPhone,
    amount: 200,
    message: 'Vassego Ungjävel!'
  },

  test() {
    expect(response.nonJSON).to.equal('Success')
  }
})
