const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Registration = mongoose.model('Registration');

const {
  check,
  validationResult
} = require('express-validator');

router.get('/', (req, res) => {
  res.render('form', {
    title: 'Registration form'
  });
});

router.post('/',
  [
    check('registrationName')
    .isLength({
      min: 1
    })
    .withMessage('Please enter a registration name'),
    check('contactName')
    .isLength({
      min: 1
    })
    .withMessage('Please enter a contact name'),
    check('pin')
    .isLength({
      min: 6
    })
    .withMessage('Please enter a valid pincode'),
    check('phoneNumber')
    .isLength({
      min: 10
    })
    .withMessage('Please enter a valid phoneNumber'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    console.log(req.body.registrationName);
    console.log(req.body);

    if (errors.isEmpty()) {
      var newvalues = req.body;
      const query = {
        registrationName: {
          $eq: req.body.registrationName
        }
      };
      console.log("main if");
      Registration.find(query).then((regis_obj) => {
        if (regis_obj.length) {
          console.log(regis_obj);
          Registration.updateOne(query, newvalues, function(err, mres) {
            if (!err) {
              res.send('Registration updated!');
            }
          })
        } else {
              console.log("in else");
              const registration = new Registration(req.body);
              registration.save()
                .then(() => {
                  res.send('Thank you for your registration!');
                })
                .catch((err) => {
                  console.log(err);
                  res.send('Sorry! Something went wrong.');
                });
            }
      });
    } else {
      res.status(400);
      res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,
      });
    }

  });

module.exports = router;
