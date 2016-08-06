// //We're using the express framework and the mailgun-js wrapper
// var express = require('express');
// var Mailgun = require('mailgun-js');
// //init express
// var app = express();


// //Your api key, from Mailgun’s Control Panel
// var api_key = 'MAILGUN-API-KEY';

// //Your domain, from the Mailgun Control Panel
// var domain = 'YOUR-DOMAIN.com';

// //Your sending email address
// var from_who = 'your@email.com';

// //Tell express to fetch files from the /js directory
// app.use(express.static(__dirname + '/js'));
// //We're using the Jade templating language because it's fast and neat
// app.set('view engine', 'jade')

// //Do something when you're landing on the first page
// app.get('/', function(req, res) {
//     //render the index.jade file - input forms for humans
//     res.render('index', function(err, html) {
//         if (err) {
//             // log any error to the console for debug
//             console.log(err);
//         }
//         else {
//             //no error, so send the html to the browser
//             res.send(html)
//         };
//     });
// });

// 'use strict';
// module.exports = function (app, db) {

//     // setValue and getValue are merely alias
//     // for app.set and app.get used in the less
//     // common way of setting application variables.
//     app.setValue = app.set.bind(app);

//     app.getValue = function (path) {
//         return app.get(path);
//     };

//     require('./app-variables')(app);
//     require('./static-middleware')(app);
//     require('./parsing-middleware')(app);

//     // Logging middleware, set as application
//     // variable inside of server/app/configure/app-variables.js
//     app.use(app.getValue('log'));

//     require('./authentication')(app, db);

// };
