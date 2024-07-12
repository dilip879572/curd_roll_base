const CryptoJS = require('crypto-js');
var encryptedKey = "sglSecurity";
let self = module.exports = {
    encodeData: (data) => {
        var iv = CryptoJS.lib.WordArray.random(128 / 8);
        var salt = CryptoJS.lib.WordArray.random(128 / 8);
        var encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), encryptedKey);
        var transitmessage = salt.toString() + iv.toString() + encryptedData.toString();
        return transitmessage
    },
    decodeData: (data) => {
        try {
            var salt = CryptoJS.enc.Hex.parse(data.substr(0, 32));
            var iv = CryptoJS.enc.Hex.parse(data.substr(32, 32))
            var encrypted = data.substring(64);
            var decrypted = CryptoJS.AES.decrypt(encrypted, encryptedKey)
            decrypted = decrypted.toString(CryptoJS.enc.Utf8)
            data = JSON.parse(decrypted);
            return data;
        } catch (e) {
            return "";
        }
    },
    validateEmail: (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    RANDOM_NUMBER1: 100000,
    RANDOM_NUMBER2: 900000,
};