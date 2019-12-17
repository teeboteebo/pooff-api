module.exports = ({ expect, response, store }) => ({
  path: 'myuser',
  method: 'get',

  test() {
    expect(response).to.have.property('role')
    expect(response).to.have.property('active')
    expect(response).to.have.property('darkMode')
    expect(response).to.have.property('transactions')
    expect(response).to.have.property('children')
    expect(response).to.have.property('_id')
    expect(response).to.have.property('personId')
    expect(response).to.have.property('username')
    expect(response).to.have.property('password')
    expect(response).to.have.property('firstName')
    expect(response).to.have.property('lastName')
    expect(response).to.have.property('email')
    expect(response).to.have.property('phone')
    store.userOnePhone = response.phone
  }
})
