module.exports = ({ response, expect, store }) => ({
  path: 'mytransactions/balance',
  method: 'get',

  test() {
    expect(response.balance).to.be.gt(0)

    store.userOneBalance = response.balance
  }
})
