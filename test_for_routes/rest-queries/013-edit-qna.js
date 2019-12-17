module.exports = ({ expect, response, store }) => ({
  path: `qnas/id/${store.qnaIdToEdit}`,
  method: 'put',
  body: {
    counter: 100
  },
  test() {
    expect(response.nonJSON).to.not.equal('Page not found.')
    expect(response.counter).to.equal(100)
  }
})
