const express = require("express") 
const Notification = require("../schemas/Notification") 
 
let router = express.Router(); 

//find all notification that has been posted
router.get('/api/notification', async (req, res) => { 
    let notify = await Notification.find({})
    res.status(200).send(notify)
}) 


//create notification
router.post('/api/notification', async (req, res) => { 
        let notify = new Notification(req.body); 
    try{
        await notify.save(); 
        res.json(notify)
    }
    catch (err) {
        res.send("Could not post notification")
      }
}) 


//delete a notification
router.delete('/api/notification/delete', async (req, res) =>{
 try{
     let notifyToDelete = await Notification.findById(req.body.id)
     notifyToDelete.delete()
     res.status(200).send("Notification found and deleted!")
    } catch (err) {
        res.send("No such notification found")
      }
 })

 

module.exports = router