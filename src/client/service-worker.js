/* eslint-disable no-restricted-globals */

self.addEventListener('push', e => {
  const data = e.data.json();

  self.registration.showNotification(data.title, {
    body: 'Notified by Mateja',
    icon: 'https://i.imgur.com/ul6twSo.png',
  });
});
