// //We're using the express framework and the mailgun-js wrapper
var express = require('express');
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
var auth = {
  auth: {
    api_key: config.mailgunKey,
    domain: config.mailgunDomain
  }
}

var nodemailerMailgun = nodemailer.createTransport(mg(auth));

nodemailerMailgun.sendMail({
  from: config.nodeMailerTestEmail,
  to: config.nodeMailerTestEmail, // An array if you have multiple recipients.
  subject: 'Hey you, awesome!',
  //You can use "html:" to send HTML email content. It's magic!
  // html: '<b>Wow Big powerful letters</b>',
  //You can use "text:" to send plain-text content. It's oldschool!
  text: 'Mailgun rocks, pow pow!'
}, function (err, info) {
  if (err) {
    console.log('Error: ' + err);
  }
  else {
    console.log('Response: ' + info);
  }
});
