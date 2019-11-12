const express = require('express')
const Qna = require('../schemas/Qna')

const router = express.Router()

router.put('/api/counter/:id', async (req, res) => {
  const qna = await Qna.findById(req.params.id)
  qna.counter++
  qna.save(err => {
    if (err) return
    res.status(200).json({ success: 'Counter updated!' })
  })
})

module.exports = router
