"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function UserAPI(token) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isLogged = _useState2[0],
      setIsLogged = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isAdmin = _useState4[0],
      setIsAdmin = _useState4[1]; //const [user, setUser] = useState([])


  (0, _react.useEffect)(function () {
    if (token) {
      var getUser = function getUser() {
        var res;
        return regeneratorRuntime.async(function getUser$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return regeneratorRuntime.awrap(_axios["default"].get("/user/infor", {
                  headers: {
                    Authorization: token
                  }
                }));

              case 3:
                res = _context.sent;
                console.log(res.data.name); //setUser(res.data)

                setIsLogged(true);
                res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                alert(_context.t0.response.data.msg);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, null, null, [[0, 9]]);
      };

      getUser();
    }
  }, [token]);
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin] //user: [user, setUser]

  };
}

var _default = UserAPI;
exports["default"] = _default;