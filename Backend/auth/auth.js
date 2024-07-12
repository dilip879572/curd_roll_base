const User = require("../models/user.model");
const constantString = require('../config/constants');

exports.isAuth = function (req, res, next) {
    let defaultLang = req.headers.currentlang ? req.headers.currentlang : 'en';
    if (!req.headers['authorization'] || req.headers['authorization'] === 'undefined') {
        return res.status(401).send({
            msg: constantString.message[defaultLang].invalid_authorization,
            lang: defaultLang,
            success: false
        });
    }
    User.verifyToken(req.headers['authorization'], function (valid) {
        if (!valid) {
            return res.status(401).send({
                msg: constantString.message[defaultLang].invalid_authorization,
                lang: defaultLang,
                success: false
            });
        }
        else {
            req.user_params = valid;
            next();
        }
    })
}