'use strict';
var router = require('express').Router();
module.exports = router;
var db = require('../../db')
var User = db.model('user');
var UserShow = db.model('user_show');
var mailer = require('express-mailer');

router.get('/send', function (req, res, next) {
  mailer.send('email',
    {
      template: 'email'
    },
    {
    to: '', // REQUIRED. This can be a comma delimited string just like a normal email to field.
    subject: 'Update', // REQUIRED.
    otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
  }, function (err) {
    if (err) {
      // handle error
      console.log(err);
      res.send('There was an error sending the email');
      return;
    }
    res.send('Email Sent');
  });
});
