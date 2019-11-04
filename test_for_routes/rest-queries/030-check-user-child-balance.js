module.exports = ({ expect, response }) => ({
  path: 'mytransactions/balance',
  method: 'get',

  test() {
    expect(response.balance).to.be.equal(200)
  }
})
