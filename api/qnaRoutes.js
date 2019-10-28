const express = require('express');
const Qna = require('../schemas/Qna');

let router = express.Router();

//add question by admin
router.post('/api/qna', async (req, res) => {
    let qna = new Qna(req.body.content);
    try {
        qna.save();
    }
    catch (error) {
        res.status(404)
        console.log(error)
    }
})