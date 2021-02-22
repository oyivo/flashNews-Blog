"use strict";

var jwt = require('jsonwebtoken');

var User = require('../models/userModel');

var auth = function auth(req, res, next) {
  try {
    var token = req.header("Authorization");
    if (!token) return res.status(400).json({
      msg: "Invalid Authentication"
    });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user, payload) {
      if (err) return res.status(400).json({
        msg: "Invalid Authentication"
      }); // const {_id} = payload
      // User.findById(_id).then(userData => {
      //     req.user = userData
      //     next()
      // })

      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message
    });
  }
};

module.exports = auth;