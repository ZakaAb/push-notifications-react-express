const express = require('express')

const webpush = require('web-push')

const bodyParser = require('body-parser')

const path = require('path')

const cors = require('cors')

const app = express()

app.use(bodyParser.json())

app.use(
  cors({
    origin: '*',
  })
)

// generate public and private keys
// .\node_modules\.bin\web-push generate-vapid-keys

//storing the keys in variables
const publicVapidKey =
  'BFK2l_wR14lFUnaZhrO6nJFO8j8oAmotYvexKaZQhOVvA61kCoG-tTrwlIrP8gCIHZUACB_09tFblhfKM5dzDWk'
const privateVapidKey = 'hyVFayLMzOhMXgEGqCkgrACTP2y5J_AD-c9EPnBYKYU'

//setting vapid keys details
webpush.setVapidDetails(
  'mailto:zaka.abahri@gmail.com',
  publicVapidKey,
  privateVapidKey
)

app.post('/subscribe', (req, res) => {
  const subcription = req.body

  res.status(201).json({})

  const payload = JSON.stringify({ title: 'Push Notification by zaki' })

  webpush
    .sendNotification(subcription, payload)
    .catch((err) => console.log(err))
})

const port = 4000
app.listen(port, () => {
  console.log(`server started on ${port}`)
})
