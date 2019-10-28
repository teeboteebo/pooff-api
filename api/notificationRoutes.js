const express = require("express") 
const Notification = require("../schemas/Notification") 
 
let router = express.Router(); 


router.get('/api/notification', async (req, res) => { 
    let notify = await Notification.find({})
    res.json(notify)
}) 

router.post('/api/notification', async (req, res) => { 
    let notify = new Notification(req.body); 
    console.log(notify) 
    await notify.save(); 
    res.json(notify) 
 
}) 


module.exports = router