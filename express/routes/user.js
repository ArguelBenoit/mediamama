const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const createToken = require('../util/token');

function hashPassword(password, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => callback(err, hash));
  });
}

exports.router = () => {
  return router

    .post('/subscribe', (req, res) => {
      let user = req.body;
      hashPassword(user.password, (err, hash) => {
        if (err) {
          res.status(500).json({ message: 'ici et là'});
        } else {
          user.password = hash;
          // création de l'utilisateur
          // renvoi du token de login
          res.status(200).json({ id_token: createToken(user) });
        }
      });
    });

    // .post('/login', (req, res) => {
    //   createToken(req.body.name, req.body.password).then(token => {
    //     res.status(200).json({ token });
    //   }).catch(err => {
    //     res.status(401).json({ message: 'Connexion error', err });
    //   });
    // })

    // .post('/modify', (req, res) => {
    //   createToken(req.body.name, req.body.password).then(token => {
    //     res.status(200).json({ token });
    //   }).catch(err => {
    //     res.status(401).json({ message: 'Connexion error', err });
    //   });
    // })
    //
    // .get('/ping', (req, res) => {
    //   checkToken(req.headers['authorization']).then(() => {
    //     res.status(200).json({ message: 'pong' });
    //   }).catch(() => {
    //     res.status(401).json({ message: 'Your are not connected' });
    //   });
    // });
};
