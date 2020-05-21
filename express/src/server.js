
import express from 'express';
import { connectDb } from './models';
import config from '../config';
import routes from './routes';

const app = express();

// ---

connectDb().then(() => {
  app.listen(config.port);
  app.use(express.json());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  // const user = require('./routes/user').router;
  app.use('/api/user', routes.user);
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

}).catch(err => console.log(err));
