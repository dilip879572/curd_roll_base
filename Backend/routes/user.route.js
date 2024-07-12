"use strict";
const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user.controller");
const multer = require("multer");
const path = require("path");
const upload = multer({
  limits: 1000000000 * 2000000,
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, "../public/user"));
    },

    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
});

router.post("/login", userCtrl.login);

router.post("/register", userCtrl.register);
module.exports = router;
