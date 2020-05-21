const bcrypt = require('bcryptjs');
const createToken = require('../utils/token');
import { Router } from 'express';
const router = Router();
import models from '../models';

function hashPassword(password, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => callback(err, hash));
  });
}

router.post('/subscribe', (req, res) => {
  let user = req.body;
  hashPassword(user.password, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: 'error'});
    } else {
      user.password = hash;
      // send user in dataBase
      // todo: créer une fnction async pour gérer les problèmes de doublon
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
  createToken(req.body.name, req.body.password).then(token => {
    return res.status(200).json({ token });
  }).catch(err => {
    return res.status(401).json({ message: 'Connexion error', err });
  });
})

router.post('/modify', (req, res) => {
  createToken(req.body.name, req.body.password).then(token => {
    return res.status(200).json({ token });
  }).catch(err => {
    return res.status(401).json({ message: 'Connexion error', err });
  });
})

router.post('/ping', (req, res) => {
  checkToken(req.headers['authorization']).then(() => {
    return res.status(200).json({ message: 'pong' });
  }).catch(() => {
    return res.status(401).json({ message: 'Your are not connected' });
  });
});

export default router;
