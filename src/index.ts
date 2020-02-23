import * as express from 'express';

const publicVapidKey =
  'BKdLrLW2cNG_4_YRGuU-P3DR_hMnYfms1EegXnz5nEhGsC41WryTIxmU0Geix5KNSD05RzpXRRE5JCSnxgsyUMc';

const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

if (!privateVapidKey) {
  throw new Error('Private VAPID key not supplied');
}

const app = express();

app.get('/', (req, res) => res.json({ hello: 'world' }));

app.listen(3000, () => console.log('http://localhost:3000'));
