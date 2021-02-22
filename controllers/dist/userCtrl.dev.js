"use strict";

var Users = require('../models/userModel');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var userCtrl = {
  register: function register(req, res) {
    var _req$body, name, email, password, user, passwordHash, newUser, accesstoken, refreshtoken;

    return regeneratorRuntime.async(function register$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
            _context.next = 4;
            return regeneratorRuntime.awrap(Users.findOne({
              email: email
            }));

          case 4:
            user = _context.sent;

            if (!user) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              msg: "The email already exists."
            }));

          case 7:
            if (!(password.length < 6)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              msg: "Password is at least 6 characters long."
            }));

          case 9:
            _context.next = 11;
            return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

          case 11:
            passwordHash = _context.sent;
            newUser = new Users({
              name: name,
              email: email,
              password: passwordHash
            }); // Save mongodb

            _context.next = 15;
            return regeneratorRuntime.awrap(newUser.save());

          case 15:
            // Then create jsonwebtoken to authentication
            accesstoken = createAccessToken({
              id: newUser._id
            });
            refreshtoken = createRefreshToken({
              id: newUser._id
            });
            res.cookie('refreshtoken', refreshtoken, {
              httpOnly: true,
              path: '/user/refresh_token',
              maxAge: 7 * 24 * 60 * 60 * 1000 // 7d

            });
            res.json({
              accesstoken: accesstoken
            });
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json({
              msg: _context.t0.message
            }));

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 21]]);
  },
  login: function login(req, res) {
    var _req$body2, email, password, user, isMatch, accesstoken, refreshtoken;

    return regeneratorRuntime.async(function login$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            _context2.next = 4;
            return regeneratorRuntime.awrap(Users.findOne({
              email: email
            }));

          case 4:
            user = _context2.sent;

            if (user) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              msg: "User does not exist."
            }));

          case 7:
            _context2.next = 9;
            return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

          case 9:
            isMatch = _context2.sent;

            if (isMatch) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              msg: "Incorrect password."
            }));

          case 12:
            // If login success , create access token and refresh token
            accesstoken = createAccessToken({
              id: user._id
            });
            refreshtoken = createRefreshToken({
              id: user._id
            });
            res.cookie('refreshtoken', refreshtoken, {
              httpOnly: true,
              path: '/user/refresh_token',
              maxAge: 7 * 24 * 60 * 60 * 1000 // 7d

            });
            res.json({
              accesstoken: accesstoken
            });
            _context2.next = 21;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json({
              msg: _context2.t0.message
            }));

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 18]]);
  },
  logout: function logout(req, res) {
    return regeneratorRuntime.async(function logout$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            res.clearCookie('refreshtoken', {
              path: '/user/refresh_token'
            });
            return _context3.abrupt("return", res.json({
              msg: "Logged out"
            }));

          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(500).json({
              msg: _context3.t0.message
            }));

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 5]]);
  },
  refreshToken: function refreshToken(req, res) {
    try {
      var rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({
        msg: "Please Login or Register"
      });
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, function (err, user) {
        if (err) return res.status(400).json({
          msg: "Please Login or Register"
        });
        var accesstoken = createAccessToken({
          id: user.id
        });
        res.json({
          accesstoken: accesstoken
        });
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message
      });
    }
  },
  getUser: function getUser(req, res) {
    var user;
    return regeneratorRuntime.async(function getUser$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return regeneratorRuntime.awrap(Users.findById(req.user.id).select('-password'));

          case 3:
            user = _context4.sent;

            if (user) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              msg: "User does not exist."
            }));

          case 6:
            res.json(user);
            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(500).json({
              msg: _context4.t0.message
            }));

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 9]]);
  },
  history: function history(req, res) {
    var history;
    return regeneratorRuntime.async(function history$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return regeneratorRuntime.awrap(Payments.find({
              user_id: req.user.id
            }));

          case 3:
            history = _context5.sent;
            res.json(history);
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status(500).json({
              msg: _context5.t0.message
            }));

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 7]]);
  }
};

var createAccessToken = function createAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m'
  });
};

var createRefreshToken = function createRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '25m'
  });
};

module.exports = userCtrl;