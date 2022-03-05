export function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export const publicVapidKey =
  'BFK2l_wR14lFUnaZhrO6nJFO8j8oAmotYvexKaZQhOVvA61kCoG-tTrwlIrP8gCIHZUACB_09tFblhfKM5dzDWk'
