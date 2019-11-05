module.exports = ({ expect, response, store }) => ({
  path: 'mychildren',
  method: 'get',

  test() {
    expect(response).to.be.an('array').that.is.not.empty
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
