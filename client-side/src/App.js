import { useEffect } from 'react'
import { publicVapidKey, urlBase64ToUint8Array } from './utils'

const send = async () => {
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/',
  })

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,

    //public vapid key
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  })

  await fetch('http://localhost:4000/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json',
    },
  })
}

function App() {
  useEffect(() => {
    navigator.serviceWorker.ready.then((registration) => {
      registration.pushManager.getSubscription().then((pushSubscription) => {
        if (!pushSubscription) {
          //the user was never subscribed
          send().catch((err) => console.log(err))
        } else {
          let json = pushSubscription.toJSON()
          let public_key = json.keys.p256dh

          if (public_key !== publicVapidKey)
            pushSubscription.unsubscribe().then((successful) => {
              send().catch((err) => console.log(err))
            })
        }
      })
    })
  }, [])
  return <div className="App"></div>
}

export default App
