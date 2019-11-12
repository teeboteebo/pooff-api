module.exports = ({ expect, response, store }) => ({
  path: 'mytransactions',
  method: 'get',

  test() {
    expect(response).to.be.an('array').that.is.not.empty
    store.bankTransId = response[0]._id
  }
})
