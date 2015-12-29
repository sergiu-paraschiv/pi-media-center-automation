"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.limetorrents = undefined;

var _provider = require('../provider.js');

var _provider2 = _interopRequireDefault(_provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var limetorrents = exports.limetorrents = (function (_Provider) {
  _inherits(limetorrents, _Provider);

  function limetorrents() {
    _classCallCheck(this, limetorrents);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(limetorrents).apply(this, arguments));
  }

  _createClass(limetorrents, [{
    key: 'processSearchResponse',
    value: function processSearchResponse($, deferred, scope, torrentResultList) {
      if ($('.table2 tr').length > 4) {
        $('.table2 tr').each(function (index, torrents) {

          if ($(torrents).find('.tt-name a.csprite_dl14').attr('href')) {

            var find_torrent_link = $(torrents).find('.tt-name a.csprite_dl14');
            var find_torrent_title = $(torrents).find('.tt-name a');
            var find_torrent_size = $(torrents).find('td.tdnormal');
            var find_torrent_seeders = $(torrents).find('td.tdseed');
            var find_torrent_leechers = $(torrents).find('td.tdleech');
            var find_date_added = $(torrents).find('td.tdnormal');

            var torrent_link = find_torrent_link.attr('href');
            var torrent_name = find_torrent_title.text();
            var torrent_size = find_torrent_size.next().first().text();
            var torrent_seed = find_torrent_seeders.text();
            var torrent_leech = find_torrent_leechers.text();
            var date_added = find_date_added.first().text().split(' -')[0];

            scope.buildResult(scope.getDataStructure(torrent_name, "", torrent_seed, torrent_leech, torrent_size, "", torrent_link, false, date_added), torrentResultList, deferred);
          }
        });
      } else {
        deferred.reject("No torrents found");
      }
    }
  }]);

  return limetorrents;
})(_provider2.default);

module.exports = limetorrents;