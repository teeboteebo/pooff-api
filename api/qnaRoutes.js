const express = require('express')
const Qna = require('../schemas/Qna')

let router = express.Router()

//add questions / answers by admin
router.post('/api/qnas', async (req, res) => {
  let qna = new Qna(req.body)
  qna.createdAtDate = Date.now()
  console.log(qna)
  await qna.save()
  res.json(qna)
})

// find all questions and answers
router.get('/api/qna', async (req, res) => {
  let allQuestionsAndAnswers = await Qna.find()
  res.status(200).send(allQuestionsAndAnswers)
})

// update questions and answers
router.put('/api/qnas/:id', async (req, res) => {
  let updateQuestionAndAnswer = await Qna.findById(req.params.id)
  updateQuestionAndAnswer.question = req.body.question
  updateQuestionAndAnswer.answer = req.body.answer
  updateQuestionAndAnswer.save(function(err) {
    if (err) {
      next(err)
    } else {
      res.json(updateQuestionAndAnswer)
    }
  })
})

//delete one question
router.delete('/api/qnas/delete/:id', async (req, res) => {
  try {
    let questionToDelete = await Qna.findById(req.params.id)
    questionToDelete.delete()
    res.status(200).send('Question deleted!')
  } catch (err) {
    res.send('No such question')
  }
})

module.exports = router
