module.exports = ({ expect, response, store }) => ({
  path: 'qnas',
  method: 'post',
  body: {
    question: 'Vad är pooff?',
    answer: 'Pooff är en betalningstjänst!'
  },
  test() {
    expect(response.nonJSON).to.not.equal('Page not found.')
    expect(response).to.have.property('counter')
    expect(response).to.have.property('_id')
    expect(response).to.have.property('question')
    expect(response).to.have.property('answer')
    expect(response).to.have.property('createdAtDate')

    store.qnaIdToEdit = response._id
  }
})
