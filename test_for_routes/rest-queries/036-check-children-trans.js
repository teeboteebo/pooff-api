module.exports = ({ expect, response, store }) => ({
  path: 'mychildren',
  method: 'get',

  test() {
    expect(response).to.be.an('array').that.is.not.empty
    // expect(response[0]._id).to.be.equal(store.userOneChildPhone)
  }
})

// respone = [
//   {
//     firstName: 'string',
//     lastName: 'string',
//     transactions: [{}, {}, {}]
//   },
//   {
//     firstName: 'string',
//     lastName: 'string',
//     transactions: [{}, {}, {}]
//   }
// ]
