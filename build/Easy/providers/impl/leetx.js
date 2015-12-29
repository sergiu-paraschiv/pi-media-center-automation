"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.leetx = undefined;

var _provider = require('../provider.js');

var _provider2 = _interopRequireDefault(_provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var leetx = exports.leetx = (function (_Provider) {
  _inherits(leetx, _Provider);

  function leetx() {
    _classCallCheck(this, leetx);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(leetx).apply(this, arguments));
  }

  _createClass(leetx, [{
    key: 'processSearchResponse',
    value: function processSearchResponse($, deferred, scope, torrentResultList) {
      if ($('.tab-detail ul li').length > 0) {
        $('.tab-detail ul li').each(function (index, torrents) {
          var d = $(this);
          var div = d.children('div');
          var links = $(torrents).find('a');

          $(links).each(function (i, link) {
            if ($(link).attr('href').indexOf("/torrent/") > -1) {
              var leetx_link = $(link).attr('href');
              var torrent_title = $(link).text();
              var torrent_size = $(div).eq(3).text();
              var torrent_seeds = $(div).eq(1).text();
              var torrent_leech = $(div).eq(2).text();

              scope.buildResult(scope.getDataStructure(torrent_title, "", torrent_seeds, torrent_leech, torrent_size, "", scope.baseUrl + leetx_link, false, undefined), torrentResultList, deferred);
            }
          });
        });
      } else {
        deferred.reject("No torrents found");
      }
    }
  }]);

  return leetx;
})(_provider2.default);

module.exports = leetx;