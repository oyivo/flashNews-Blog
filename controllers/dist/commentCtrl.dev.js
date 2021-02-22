"use strict";

var Article = require('../models/articleModel');

var Comments = require('../models/commentModel'); //const Notifications = require('../models/notificationModel')


var commentCtrl = {
  getComments: function getComments(req, res) {
    var comments;
    return regeneratorRuntime.async(function getComments$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(Comments.find());

          case 3:
            comments = _context.sent;
            res.json(comments);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json({
              msg: _context.t0.message
            }));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 7]]);
  },
  createComment: function createComment(req, res) {
    var comment, newComment;
    return regeneratorRuntime.async(function createComment$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            comment = req.body.comment;
            newComment = new Comments({
              name: req.user._id,
              comment: comment
            });
            _context2.next = 5;
            return regeneratorRuntime.awrap(newComment.save());

          case 5:
            _context2.next = 7;
            return regeneratorRuntime.awrap(Article.findOneAndUpdate({
              _id: req.params.id
            }, {
              $push: {
                comments: newComment
              }
            }, {
              safe: true,
              upsert: true
            }));

          case 7:
            // await Notifications.save({
            //   message: `${req.user._id} + commented on this post "${req.post.id}` ,
            //   postRef: req.post.id,
            //   action: "New comment"
            // })
            res.json({
              msg: "Comment Added!"
            });
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json({
              msg: _context2.t0.message
            }));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 10]]);
  },
  deleteComment: function deleteComment(req, res) {
    return regeneratorRuntime.async(function deleteComment$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(Comments.findByIdAndDelete(req.params.id));

          case 3:
            _context3.next = 5;
            return regeneratorRuntime.awrap(Article.findOneAndUpdate({
              _id: req.params.id
            }, {
              $pull: {
                comments: Comments._id
              }
            }, {
              safe: true,
              upsert: true
            }));

          case 5:
            res.json({
              msg: "Comment deleted"
            });
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(500).json({
              msg: _context3.t0.message
            }));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 8]]);
  },
  updateComment: function updateComment(req, res) {
    var _req$body, name, comment;

    return regeneratorRuntime.async(function updateComment$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body = req.body, name = _req$body.name, comment = _req$body.comment;
            _context4.next = 4;
            return regeneratorRuntime.awrap(Comments.findOneAndUpdate({
              _id: req.params.id
            }, {
              name: name,
              comment: comment
            }));

          case 4:
            res.json({
              msg: "comment edited"
            });
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(500).json({
              msg: _context4.t0.message
            }));

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 7]]);
  }
};
module.exports = commentCtrl;