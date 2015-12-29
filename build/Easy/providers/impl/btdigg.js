"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.btdigg = undefined;

var _provider = require('../provider.js');

var _provider2 = _interopRequireDefault(_provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var btdigg = exports.btdigg = (function (_Provider) {
  _inherits(btdigg, _Provider);

  function btdigg() {
    _classCallCheck(this, btdigg);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(btdigg).apply(this, arguments));
  }

  _createClass(btdigg, [{
    key: 'processSearchResponse',
    value: function processSearchResponse($, deferred, scope, torrentResultList) {
      if ($('#search_res table tr').length > 0) {
        $('#search_res table tr').each(function (index, torrents) {
          var d = $(this);
          var td = d.children('td');
          var find_torrent_title = $(torrents).find('td.torrent_name a');
          var find_torrent_link = $(torrents).find('td.ttth a');
          var find_torrent_size = $(torrents).find('table.torrent_name_tbl td.ttth');
          var find_torrent_added = $(torrents).find('table.torrent_name_tbl td.ttth');

          var torrent_title = find_torrent_title.text();
          var magnet_link = find_torrent_link.attr('href');
          var torrent_size = find_torrent_size.next().text().split('Size:').join('');
          var torrent_added = find_torrent_added.first().next().eq(1).text();

          if (magnet_link && torrent_title) {
            scope.buildResult(scope.getDataStructure(torrent_title, "", "", "", torrent_size, magnet_link, "", false, torrent_added), torrentResultList, deferred);
          }
        });
      } else {
        deferred.reject("No torrents found");
      }
    }
  }]);

  return btdigg;
})(_provider2.default);

module.exports = btdigg;