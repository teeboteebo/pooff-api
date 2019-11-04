module.exports = ({ expect, response, store }) => ({
  path: `counter/${store.qnaIdToEdit}`,
  method: 'put',

  test() {
    expect(response.nonJSON).to.not.equal('Page not found.')
    expect(response.success).to.equal('Counter updated!')
  }
})
