"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ncore = undefined;

var _authprovider2 = require('../authprovider.js');

var _authprovider3 = _interopRequireDefault(_authprovider2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ncore = exports.ncore = (function (_authprovider) {
  _inherits(ncore, _authprovider);

  function ncore() {
    _classCallCheck(this, ncore);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ncore).apply(this, arguments));
  }

  _createClass(ncore, [{
    key: 'doLogin',
    value: function doLogin(html) {
      console.info(this.name + ' logging in..');
      var $ = this.cheerio.load(html);
      this.request({
        url: this.loginUrl,
        method: 'POST',
        form: {
          set_lang: 'hu',
          submitted: 1,
          vxx: $('#login-vxx').attr('value'),
          nev: this.username,
          pass: this.password,
          submit: 'Belépés!'
        }
      });
    }
  }, {
    key: 'isLoggedIn',
    value: function isLoggedIn($) {
      return $('.login_td').html() == null;
    }
  }, {
    key: 'processSearchResponse',
    value: function processSearchResponse($, deferred, scope, torrentResultList) {
      if (!_get(Object.getPrototypeOf(ncore.prototype), 'processSearchResponse', this).call(this, $, deferred, scope, torrentResultList)) {
        console.info('We logged in... ' + this.name);
        return;
      }
      $('.box_torrent_all .box_nagy , .box_nagy2').each(function (index, torrents) {
        var title = $(torrents).find('a').attr('title');
        var dateAdded = $(torrents).find('.box_feltoltve , .box_feltoltve2').html().split('<br>').join(' ');
        var seeds = $(torrents).find('.box_s2 a').text();
        var leechs = $(torrents).find('.box_l2 a').text();
        var size = $(torrents).find('.box_meret2').text();
        var torrentLink = scope.baseUrl + "/" + $(torrents).find('.torrent_txt a').attr('href').split('action=details').join('action=download');
        var verified = $(torrents).find('.torrent_ok').length > 0;
        var category = $(torrents).parent().find('.categ_link').attr('alt');

        scope.buildResult(scope.getDataStructure(title, category, seeds, leechs, size, "", torrentLink, verified, dateAdded), torrentResultList, deferred);
      });
    }
  }]);

  return ncore;
})(_authprovider3.default);

module.exports = ncore;