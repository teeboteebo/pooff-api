const express = require('express')
const Qna = require('../schemas/Qna')

let router = express.Router()

//add question by admin
router.post('/api/qna', async (req, res) => {
  let qna = new Qna(req.body)
  console.log(qna)
  await qna.save()
  res.json(qna)
})

// find all questions, available for all
router.get('/api/qna/', async (req, res) => {
  let allQuestions = await Qna.find()
  res.status(200).send(allQuestions)
})

//delete one question
router.delete('/api/qna/delete/:id', async (req, res) => {
    try {
    let questionToDelete = await Qna.findById(req.params.id)
    questionToDelete.delete()
    res.status(200).send("Question deleted!")
  } catch (err) {
    res.send("No such question")
  }
})

module.exports = router
