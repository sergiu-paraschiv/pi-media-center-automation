"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extratorrent = undefined;

var _provider = require('../provider.js');

var _provider2 = _interopRequireDefault(_provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var extratorrent = exports.extratorrent = (function (_Provider) {
  _inherits(extratorrent, _Provider);

  function extratorrent() {
    _classCallCheck(this, extratorrent);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(extratorrent).apply(this, arguments));
  }

  _createClass(extratorrent, [{
    key: 'processSearchResponse',
    value: function processSearchResponse($, deferred, scope, torrentResultList) {
      if ($('.tl').find('tr').length > "3") {
        $('.tl tr').each(function (index, torrents) {

          if ($(torrents).find('td a').attr('href') !== '#') {

            var find_torrent_link = $(torrents).find('td a');
            var find_torrent_title = find_torrent_link.attr('title');
            var torrent_download = find_torrent_link.attr('href');
            var find_torrent_size = $(torrents).find('td');
            var find_torrent_seed = $(torrents).find('td.sy');
            var find_torrent_leech = $(torrents).find('td.ly');

            var torrent_link = scope.baseUrl + torrent_download.split('torrent_download').join('download');
            var torrent_name = find_torrent_title.split('Download ').join('').split(' torrent').join('');
            var torrent_size = find_torrent_size.next().next().next().first().text();
            var torrent_seed = find_torrent_seed.text();
            var torrent_leech = find_torrent_seed.text();

            scope.buildResult(scope.getDataStructure(torrent_name, "", torrent_seed, torrent_leech, torrent_size, "", torrent_link, false, undefined), torrentResultList, deferred);
          }
        });
      } else {
        deferred.reject("No torrents found");
      }
    }
  }]);

  return extratorrent;
})(_provider2.default);

module.exports = extratorrent;