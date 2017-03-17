
'use strict';
const nodemailer = require('nodemailer');
const _  = require("lodash");

let 
    configMail = {
      host: "smtp.gmail.com", // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP 587
      auth: {
        user: "nix@suppliesdc.com",
        pass: "Supp1145"
      },
      tls: {
        ciphers: 'SSLv3'
      }
    },
    transport = nodemailer.createTransport(configMail);


export function index(req, res) {
  // setup e-mail data with unicode symbols
  let 
    b = req.body,
    mailOptions = {
        from: 'Supplies de Colombia ✔ NIX <nix@suppliesdc.com>', // sender address
        to: b.to, // list of receivers
        subject: b.subject, // Subject line
        text: '✔', // plaintext body
        html: b.body // html body
    };
  // send mail with defined transport object
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.dir(error);
      res.send('nop');
    } else {
      console.dir('Message sent: ' + info.response);
      res.send('ok');
    }
  });
}

/*
// setup email data with unicode symbols
let mailOptions = {
    from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});
*/