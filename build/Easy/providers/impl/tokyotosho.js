"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokyotosho = undefined;

var _provider = require('../provider.js');

var _provider2 = _interopRequireDefault(_provider);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tokyotosho = exports.tokyotosho = (function (_Provider) {
  _inherits(tokyotosho, _Provider);

  function tokyotosho() {
    _classCallCheck(this, tokyotosho);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(tokyotosho).apply(this, arguments));
  }

  _createClass(tokyotosho, [{
    key: 'processSearchResponse',
    value: function processSearchResponse($, deferred, scope, torrentResultList) {
      if ($('.listing').find('tr').length > "0") {
        $('.listing tr').each(function (index, torrents) {

          if ($(torrents).find('.desc-top a').next().attr('href')) {
            var find_torrent_link = $(torrents).find('.desc-top a');
            var find_torrent_title = $(torrents).find('td.desc-top a');
            var find_torrent_seed = $(torrents).next().find('td.stats');
            var find_torrent_size = $(torrents).next().find('td.desc-bot').text();

            var torrent_link = find_torrent_link.next().attr('href');
            var torrent_title = find_torrent_title.text();
            var torrent_seed = find_torrent_seed.find('span').first().text();
            var torrent_leech = find_torrent_seed.find('span').first().next().text();

            var regExp = /\Size: ([^)]+) \Date:/;
            var matches = regExp.exec(find_torrent_size);
            var size = matches[0].split(' | Date:').join('').split('Size: ').join('');
            var torrent_size = size;

            var regExp2 = /\Date: ([^)]+) \UTC/;
            var matches2 = regExp2.exec(find_torrent_size);
            var date_added = (0, _moment2.default)(Date.parse(matches2[1] + " UTC")).fromNow();

            scope.buildResult(scope.getDataStructure(torrent_title, "", torrent_seed, torrent_leech, torrent_size, "", torrent_link, false, date_added), torrentResultList, deferred);
          }
        });
      } else {
        deferred.reject("No torrents found");
      }
    }
  }]);

  return tokyotosho;
})(_provider2.default);

module.exports = tokyotosho;