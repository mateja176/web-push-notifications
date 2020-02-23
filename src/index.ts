import * as express from 'express';
import * as statusCodes from 'http-status-codes';
import * as webPush from 'web-push';

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

if (!publicVapidKey || !privateVapidKey) {
  throw new Error('Private VAPID key not supplied');
}

webPush.setVapidDetails(
  'mailto:test@test.com',
  publicVapidKey,
  privateVapidKey,
);

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.json({ hello: 'world' }));

app.post('/subscribe', (req, res) => {
  const { body: subscription } = req;

  res.status(statusCodes.CREATED).json({});

  const payload = JSON.stringify({ title: 'Push Test' });

  webPush.sendNotification(subscription, payload).catch(console.error);
});

app.listen(3000, () => console.log('http://localhost:3000'));
