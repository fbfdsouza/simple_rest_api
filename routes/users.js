const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  if(!req.query.email) {
    return res.status(400).send('Missing URL parameter: email');
  }
  try {
    const foundUser = await User
      .findOne({
        email: req.query.email,
      });
    res.status(200).json(foundUser);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }

  if (!req.body.email) {
    return res.status(400).send('Request email is missing');
  }

  let model = new User(req.body);

  model.save()
    .then((doc) => {
      res.status(201).json(doc);
    })
    .catch(err => {
      res.status(500).json({
        error: "Unable to create a User"
      });
    });
});


router.put('/', (req, res) => {
  if (!req.query.email) {
    return res.status(400).json({
      error: "Missing URL parameter: Email"
    });
  }

  User.findOneAndUpdate({
    email: req.query.email
  }, req.body, {
    new: true 
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Unable to update data!"
      });
    });
});


router.delete('/', (req, res) => {
  if (!req.query.email) {
    return res.status(400).json({
      error: 'Missing URL parameter: Email'
    });
  }

  User.findOneAndRemove({
    email: req.query.email
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Unable to delete this record!"
      });
    });
});

module.exports = router;
