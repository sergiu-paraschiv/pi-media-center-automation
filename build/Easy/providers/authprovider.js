"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authprovider = undefined;

var _provider2 = require("./provider.js");

var _provider3 = _interopRequireDefault(_provider2);

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _toughCookieFilestore = require("tough-cookie-filestore");

var _toughCookieFilestore2 = _interopRequireDefault(_toughCookieFilestore);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var authprovider = exports.authprovider = (function (_provider) {
  _inherits(authprovider, _provider);

  function authprovider(urlParams, getParams, responseFormat) {
    _classCallCheck(this, authprovider);

    //todo if 2 providers tries to access the cookiestore we have a problem...
    //maybe https://github.com/JSBizon/file-cookie-store

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(authprovider).call(this, urlParams, getParams, responseFormat));

    _this._cookieFilePath = './cookies.json';

    var scope = _this;
    _fs2.default.exists(_this._cookieFilePath, function (exists) {
      if (!exists) {
        _fs2.default.writeFile(scope._cookieFilePath, "", function (err) {
          if (err) {
            return console.log(err);
          }
        });
      }
    });

    //store cookies in file
    _this.fileJar = _request2.default.jar(new _toughCookieFilestore2.default(_this._cookieFilePath));
    _this.request = _request2.default.defaults({
      jar: _this.fileJar,
      followRedirect: true,
      gzip: true,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.8',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'
      }
    });
    return _this;
  }

  /**
  * preprocesses site response and if query can't be run and you should
  * log in, does the job.
  */

  _createClass(authprovider, [{
    key: "processSearchResponse",
    value: function processSearchResponse(data, deferred, scope, torrentResultList) {
      if (!this.isLoggedIn(data)) {
        scope.loginCounter = scope.loginCounter + 1;
        console.log('You are not logged in ' + scope.name + ' trying logging in.. retrying ' + scope.loginCounter);
        if (scope.loginCounter < 3) {
          scope.doLogin(data);
          scope.search(scope.lastQuery);
        } else {
          deferred.reject("There was a problem logging in " + scope.name + " stopping query.. ");
        }
        return false;
      } else {
        scope.loginCounter = 0;
        return true;
      }
    }

    /**
    * you should implement logging here
    */

  }, {
    key: "doLogin",
    value: function doLogin(data) {
      console.warn('Unimplemented method: doLogin in class ' + this.name);
    }

    /**
    * you should check logged state and return true/false with processing data
    */

  }, {
    key: "isLoggedIn",
    value: function isLoggedIn(data) {
      console.warn('Unimplemented method: isLoggedIn in class ' + this.name);
    }
  }, {
    key: "loginUrl",
    get: function get() {
      return this.baseUrl + this._urlParams.loginUrl;
    }
  }, {
    key: "username",
    get: function get() {
      return this._username;
    },
    set: function set(value) {
      this._username = value;
      this.loginCounter = 0;
    }
  }, {
    key: "password",
    get: function get() {
      return this._password;
    },
    set: function set(value) {
      this._password = value;
      this.loginCounter = 0;
    }
  }]);

  return authprovider;
})(_provider3.default);

module.exports = authprovider;