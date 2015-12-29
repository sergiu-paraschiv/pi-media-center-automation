"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tpb = undefined;

var _provider = require('../provider.js');

var _provider2 = _interopRequireDefault(_provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tpb = exports.tpb = (function (_Provider) {
  _inherits(tpb, _Provider);

  function tpb() {
    _classCallCheck(this, tpb);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(tpb).apply(this, arguments));
  }

  _createClass(tpb, [{
    key: 'processSearchResponse',
    value: function processSearchResponse($, deferred, scope, torrentResultList) {

      $('table#searchResult tr').each(function (index, torrents) {
        var torrent_title, torrent_link, torrent_verified;

        if ($(torrents).find('.detName a').text()) {

          var find_torrent_title = $(torrents).find('.detName a');
          var find_torrent_seed = $(torrents).find('td').next().next().text();
          var find_torrent_leech = $(torrents).find('td').next().next().next().text();
          var find_torrent_size = $(torrents).find('.detDesc');

          var torrent_title = find_torrent_title.text();
          var torrent_leech = find_torrent_leech;
          var torrent_seed = find_torrent_seed.split(torrent_leech).join('');

          var matches = find_torrent_size.text().match(/, Size (.*?), ULed/g);
          var torrent_size = matches[0].split(', Size ').join('').split(', ULed').join('');
          var matches2 = find_torrent_size.text().match(/Uploaded (.*?),/g);
          var date_added = matches2[0].split('Uploaded ').join('').split(',').join('');

          var links = $(torrents).find('a');

          $(links).each(function (i, link) {

            if ($(link).attr('href').indexOf("magnet:?xt=urn:") > -1) {
              torrent_link = $(link).attr('href');
              // var torrent_magnet = $(link).attr('href');
              // var matches = torrent_magnet.match(/magnet:\?xt=urn:btih:(.*)&dn=/g);
              // var hash = matches[0].split('magnet:?xt=urn:btih:').join('').split('&dn=').join('');
              // torrent_link = "http://torcache.net/torrent/" + hash + ".torrent";
            }
          });

          var images = $(torrents).find('a img');

          $(images).each(function (i, images) {

            if ($(images).attr('title')) {
              if ($(images).attr('title').indexOf("VIP") > -1) {
                torrent_verified = "vip";
              } else if ($(images).attr('title').indexOf("Trusted") > -1) {
                torrent_verified = "trusted";
              }
            } else {
              torrent_verified = "";
            }
          });

          scope.buildResult(scope.getDataStructure(torrent_title, "", torrent_seed, torrent_leech, torrent_size, torrent_link, "", torrent_verified, date_added), torrentResultList, deferred);
        }
      });
    }
  }]);

  return tpb;
})(_provider2.default);

module.exports = tpb;