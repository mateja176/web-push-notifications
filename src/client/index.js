const publicVapidKey =
  'BKdLrLW2cNG_4_YRGuU-P3DR_hMnYfms1EegXnz5nEhGsC41WryTIxmU0Geix5KNSD05RzpXRRE5JCSnxgsyUMc';

/**
 *
 * @param {string} base64String
 */
const urlBase64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);

  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);

  const outputArray = new Uint8Array(rawData.length);

  return outputArray.map((_, i) => rawData.charCodeAt(i));
};

const send = () =>
  navigator.serviceWorker
    .register('./service-worker.js', {
      scope: '/',
    })
    .then(sw =>
      sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      }),
    )
    .then(subscription =>
      fetch('/subscribe', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          subscription,
        }),
      }),
    );

send()
  .then(console.log)
  .catch(console.error);
