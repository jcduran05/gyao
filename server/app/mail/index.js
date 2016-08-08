// //We're using the express framework and the mailgun-js wrapper
var express = require('express');
var Mailgun = require('mailgun-js');
//use nunjucks to render html templates w/ variables
var nunjucks = require('nunjucks');

var app = express();

// function to send user email given template and subject
var mailSender = function (userEmail, subject, html) {
    // create new mailgun instance with credentials
    var mailgun = new Mailgun({
      apiKey: api_key,
      domain: 'sandboxXX.mailgun.org'
    });
    // setup the basic mail data
    var mailData = {
      from: '',
      to: 'userEmail',
      subject:  subject,
      html: html,
      // two other useful parameters
      // testmode lets you make API calls
      // without actually firing off any emails
      'o:testmode': true,
      // you can specify a delivery time
      // up to three days in advance for
      // your emails to send.
      // 'o:deliverytime': 'Thu, 13 Oct 2011 18:02:00 GMT'
    };
    // send your mailgun instance the mailData
    mailgun.messages().send(mailData, function (err, body) {
      // If err console.log so we can debug
      if (err) {
        console.log('failed: ' + err);
      } else {
        console.log('Did it. Sent: ', body);
      }
    });

    return;
};

mailSender(from_who, 'test subject', '<p>test</p>');
