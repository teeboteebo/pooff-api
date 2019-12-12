const express = require('express');
const webpush = require('web-push');
const { privateVapidKey } = require("../config/connectionString")
const router = express.Router();
const saveSubscription = require('./saveSubscription');
const User = require("../schemas/User")


// Vapid keys (should not be stored here if in public repo)
const vapidKeys = {
  public: 'BFc21V5367vHF3b6LJdnzqUEDwocfIDTKTm7Oj8O3AwZCHw7a442Zdrssgy9q6teJQ0E5MvlZhECjWzgBe3Vp3M',
  private: privateVapidKey
};

// Who is sending the push notification
webpush.setVapidDetails(
  'mailto:your@yourmail.com',
  vapidKeys.public,
  vapidKeys.private
);

// Subscribe route
router.post('/api/push-subscribe', async (req, res) => {
  const subscription = req.body;
  // Send 201 - resource created
  res.status(201).json({ subscribing: true });

  //console.log('subscription', subscription);

  // check if logged in and then save subsription on user
  if (req.session.user) { saveSubscription(req.session.user._id, subscription) }
  // else save on the session for later use on login
  else {req.session.pendingSubscription = subscription}


  // Send some notifications...
  // this might not be what you do directly on subscription
  // normally

  //sendNotification(subscription, { body: 'Welcome!' });
  
});

router.post('/api/push-payment', async (req, res) => {
  //const subscription = req.body;
  console.log(req.body.number)

  const sub = await User.findOne({ phone: req.body.number })

  //console.log(sub)
  
  const subscription = sub.subscriptions[0]


  sendNotification(subscription, { body: `${req.body.name} skickade ${req.body.amount} kr` });

});

// A function that sends notifications
async function sendNotification(subscription, payload) {
  let toSend = {
    title: 'Pooff',
    icon: '/logo192.png',
    ...payload
  };
  await webpush.sendNotification(
    subscription, JSON.stringify(toSend)
  ).catch(err => console.log(err));
}

module.exports = router

// Note! In order to be able to send notifications
// to a certain user we need

// 1. express-session
// Every express - session has a unique id from start
// Have a memory where we pair subscriptions with session_ids
// subscriptionMem[session_id] = subscription

// 2. when the user logs in
// Write to subcription to DB, linked to the user
// remove it from subscriptionMem

// A user can have several subscriptions (different browsers etc)
// So: In Mongoose we would probably
// create a subscription collection
// and then a new field on user an array of objects ref id:s
// in the subscription collection
