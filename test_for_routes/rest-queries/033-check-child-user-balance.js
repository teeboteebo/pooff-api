module.exports = ({ response, expect }) => ({
  path: 'mytransactions/balance',
  method: 'get',

  test() {
    expect(response.balance).to.equal(199)
  }
})
