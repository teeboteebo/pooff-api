module.exports = ({ expect, response }) => ({
  path: 'login',
  method: 'get',
  test() {
    expect(response.role).to.equal('bank')
    expect(response.username).to.equal('Bank')
    expect(response._id).to.be.a('string')
  }
})
