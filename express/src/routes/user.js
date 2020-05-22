const createToken = require('../utils/token');
const hashPassword = require('../utils/hashPassword');
const bcrypt = require('bcryptjs');
import { Router } from 'express';
const router = Router();
import models from '../models';


router.post('/subscribe', (req, res) => {
  let user = req.body;
  hashPassword(user.password, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: 'error'});
    } else {
      user.password = hash;
      // send user in dataBase
      // todo: créer une function async pour gérer les problèmes de doublon
      const subscriber = new models.User(user);
      subscriber.save();
      // send jwt token
      return res.status(200).json({
        id_token: createToken(user)
      });
    }
  });
});

router.post('/login', (req, res) => {
  const password = req.body.password;
  models.User.findOne(
    {
      $or: [
        { email: req.body.email },
        { username: req.body.username }
      ]
    },
    (err, user) => {
      if (!user) {
        return res.satus(403).json({ message: 'Incorrect username or email!' });
      }
      bcrypt.compare(password, user.password, (err, isValid) => {
        if (isValid) {
          return res.status(200).json({ id_token: createToken(user) });
          res({ id_token: createToken(req.pre.user) }).code(201);
        }
        return res.satus(403).json({ message: 'Incorrect username or email!' });
      });
    }
  );
})

// router.post('/modify', (req, res) => {
//   createToken(req.body.name, req.body.password).then(token => {
//     return res.status(200).json({ token });
//   }).catch(err => {
//     return res.status(401).json({ message: 'Connexion error', err });
//   });
// })

router.post('/ping', (req, res) => {
  checkToken(req.headers['authorization']).then(() => {
    return res.status(200).json({ message: 'pong' });
  }).catch(() => {
    return res.status(401).json({ message: 'Your are not connected' });
  });
});

export default router;
