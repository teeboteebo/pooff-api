module.exports = ({ expect, response, store }) => ({
  path: 'mytransactions',
  method: 'get',

  test() {
    expect(response).to.be.an('array').that.is.not.empty
    expect(response[0]._id).to.be.equal(store.bankTransId)
  }
})
