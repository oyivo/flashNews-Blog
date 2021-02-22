"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Articles = require('../models/articleModel'); // Filter, sorting and paginating


var APIfeatures =
/*#__PURE__*/
function () {
  function APIfeatures(query, queryString) {
    _classCallCheck(this, APIfeatures);

    this.query = query;
    this.queryString = queryString;
  }

  _createClass(APIfeatures, [{
    key: "filtering",
    value: function filtering() {
      var queryObj = _objectSpread({}, this.queryString); //queryString = req.query


      var excludedFields = ['page', 'sort', 'limit'];
      excludedFields.forEach(function (el) {
        return delete queryObj[el];
      });
      var queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, function (match) {
        return '$' + match;
      });
      this.query.find(JSON.parse(queryStr));
      return this;
    }
  }, {
    key: "sorting",
    value: function sorting() {
      if (this.queryString.sort) {
        var sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('-createdAt');
      }

      return this;
    }
  }, {
    key: "paginating",
    value: function paginating() {
      var page = this.queryString.page * 1 || 1;
      var limit = this.queryString.limit * 1 || 9;
      var skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }]);

  return APIfeatures;
}();

var articleCtrl = {
  getArticle: function getArticle(req, res) {
    var features, articles;
    return regeneratorRuntime.async(function getArticle$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            features = new APIfeatures(Articles.find().populate('comments'), req.query).filtering().sorting().paginating();
            _context.next = 4;
            return regeneratorRuntime.awrap(features.query);

          case 4:
            articles = _context.sent;
            res.json({
              status: 'success',
              result: articles.length,
              articles: articles
            });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json({
              msg: _context.t0.message
            }));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 8]]);
  },
  createArticle: function createArticle(req, res) {
    var _req$body, article_id, title, author, content, image, category, postedBy, article, newArticles;

    return regeneratorRuntime.async(function createArticle$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, article_id = _req$body.article_id, title = _req$body.title, author = _req$body.author, content = _req$body.content, image = _req$body.image, category = _req$body.category, postedBy = _req$body.postedBy; // if (!image) return res.status(400).json({ msg: "No image upload" })

            _context2.next = 4;
            return regeneratorRuntime.awrap(Articles.findOne({
              article_id: article_id
            }));

          case 4:
            article = _context2.sent;

            if (!article) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              msg: "This article already exists."
            }));

          case 7:
            newArticles = new Articles({
              article_id: article_id,
              title: title.toLowerCase(),
              author: author,
              content: content,
              image: image,
              category: category,
              postedBy: postedBy
            });
            _context2.next = 10;
            return regeneratorRuntime.awrap(newArticles.save());

          case 10:
            res.json({
              msg: "Created a article"
            });
            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json({
              msg: _context2.t0.message
            }));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 13]]);
  },
  deleteArticle: function deleteArticle(req, res) {
    return regeneratorRuntime.async(function deleteArticle$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(Articles.findByIdAndDelete(req.params.id));

          case 3:
            res.json({
              msg: "Deleted a article"
            });
            _context3.next = 9;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(500).json({
              msg: _context3.t0.message
            }));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 6]]);
  },
  updateArticle: function updateArticle(req, res) {
    var _req$body2, title, content, image, category;

    return regeneratorRuntime.async(function updateArticle$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body2 = req.body, title = _req$body2.title, content = _req$body2.content, image = _req$body2.image, category = _req$body2.category;
            _context4.next = 4;
            return regeneratorRuntime.awrap(Articles.findOneAndUpdate({
              _id: req.params.id
            }, {
              title: title.toLowerCase(),
              content: content,
              image: image,
              category: category
            }));

          case 4:
            res.json({
              msg: "Updated an article"
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
  },
  upvotePost: function upvotePost(req, res) {
    return regeneratorRuntime.async(function upvotePost$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return regeneratorRuntime.awrap(Articles.findOneAndUpdate({
              _id: req.params.id
            }, {
              $inc: {
                upvote: +1
              }
            }));

          case 3:
            return _context5.abrupt("return", res.json({
              msg: "liked"
            }));

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status(500).json({
              msg: _context5.t0.message
            }));

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 6]]);
  },
  downvotePost: function downvotePost(req, res) {
    return regeneratorRuntime.async(function downvotePost$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return regeneratorRuntime.awrap(Articles.findOneAndUpdate({
              _id: req.params.id
            }, {
              $inc: {
                downvote: 1
              }
            }));

          case 3:
            return _context6.abrupt("return", res.json({
              msg: "unliked"
            }));

          case 6:
            _context6.prev = 6;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", res.status(500).json({
              msg: _context6.t0.message
            }));

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 6]]);
  }
};
module.exports = articleCtrl;