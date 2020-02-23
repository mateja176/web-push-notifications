import * as express from 'express';

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

if (!publicVapidKey || !privateVapidKey) {
  throw new Error('Private VAPID key not supplied');
}

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.json({ hello: 'world' }));

app.listen(3000, () => console.log('http://localhost:3000'));
