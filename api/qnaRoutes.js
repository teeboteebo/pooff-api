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

module.exports = router
