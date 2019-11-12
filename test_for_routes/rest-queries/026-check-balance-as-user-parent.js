module.exports = ({ expect, response, store }) => ({
  path: 'mytransactions/balance',
  method: 'get',

  test() {
    expect(response.balance).to.equal(store.userOneBalance - 200)
  }
})
