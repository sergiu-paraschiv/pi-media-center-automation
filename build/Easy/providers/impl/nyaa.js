"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nyaa = undefined;

var _provider = require('../provider.js');

var _provider2 = _interopRequireDefault(_provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var nyaa = exports.nyaa = (function (_Provider) {
  _inherits(nyaa, _Provider);

  function nyaa() {
    _classCallCheck(this, nyaa);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(nyaa).apply(this, arguments));
  }

  _createClass(nyaa, [{
    key: 'processSearchResponse',
    value: function processSearchResponse($, deferred, scope, torrentResultList) {

      if ($('.tlist').find('tr').length > "2") {
        $('.tlist tr.tlistrow').each(function (index, torrents) {

          var find_torrent_title = $(torrents).find('.tlistname a');
          var find_torrent_link = $(torrents).find('.tlistdownload a');
          var find_torrent_seed = $(torrents).find('.tlistsn');
          var find_torrent_leech = $(torrents).find('.tlistln');
          var find_torrent_size = $(torrents).find('.tlistsize');

          var torrent_title = find_torrent_title.text();
          var torrent_link = find_torrent_link.attr('href');
          var torrent_seed = find_torrent_seed.text();
          var torrent_leech = find_torrent_leech.text();
          var torrent_size = find_torrent_size.text();

          scope.buildResult(scope.getDataStructure(torrent_title, "", torrent_seed, torrent_leech, torrent_size, "", torrent_link, false, undefined), torrentResultList, deferred);
        });
      } else {
        deferred.reject("No torrents found");
      }
    }
  }]);

  return nyaa;
})(_provider2.default);

module.exports = nyaa;