const nodemailer = require('nodemailer');
const sharedService = require('../config/sharedService');
exports.mailer = (email, subject, html) => {
    let smtpObj = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // use SSL
        debug: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    };

    const transporter = nodemailer.createTransport(smtpObj);

    const mailOptions = {
        from: process.env.NO_REPLY,
        to: email,
        subject: typeof sharedService[subject] === 'undefined' ? subject : sharedService[subject],
        html: html,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });

};

exports.mailerFromTo = (toEmail, fromEmail, subject, html, filename = '', callback) => {

    let smtpObj = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // use SSL
        debug: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    };
    const transporter = nodemailer.createTransport(smtpObj);

    let idTo = toEmail ? toEmail : process.env.NO_REPLY;
    let idFrom = fromEmail ? fromEmail : process.env.NO_REPLY;
    let mailSubject = subject ? subject : "Mail From SGL.";
    let mailOptions;
    if (filename) {
        mailOptions = {
            from: idFrom,
            to: idTo,
            subject: mailSubject,
            html: html,
            attachments: filename
        };
    } else {
        mailOptions = {
            from: idFrom,
            to: idTo,
            subject: mailSubject,
            html: html
        };
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            callback(error, null);
        }
        else {
            //console.log('Email sent: ' + info.response);
            callback(null, info.response);
        }
    });

};