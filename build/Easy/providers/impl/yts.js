"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.yts = undefined;

var _provider = require('../provider.js');

var _provider2 = _interopRequireDefault(_provider);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var yts = exports.yts = (function (_Provider) {
  _inherits(yts, _Provider);

  function yts() {
    _classCallCheck(this, yts);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(yts).apply(this, arguments));
  }

  _createClass(yts, [{
    key: 'processSearchResponse',
    value: function processSearchResponse(data, deferred, scope, torrentResultList) {
      if (data && data.data && data.data.movie_count > 0) {
        //skip one level
        data = data.data;
        for (var torrent in data.movies) {
          var title = data.movies[torrent].title_long;

          for (var torrents in data.movies[torrent].torrents) {

            var torrent_quality = data.movies[torrent].torrents[torrents].quality;
            var torrent_title = title + ' ' + torrent_quality;
            var seeds = data.movies[torrent].torrents[torrents].seeds;
            var leechs = data.movies[torrent].torrents[torrents].peers;
            var hash = data.movies[torrent].torrents[torrents].hash;
            var torrent_link = data.movies[torrent].torrents[torrents].url;
            var size = data.movies[torrent].torrents[torrents].size;
            var date_added = (0, _moment2.default)(Date.parse(data.movies[torrent].torrents[torrents].date_uploaded.split(' ')[0])).fromNow();

            scope.buildResult(scope.getDataStructure(torrent_title, "", seeds, leechs, size, "", torrent_link, false, date_added), torrentResultList, deferred);
          }
        }
      } else {
        deferred.reject("No torrents found");
      }
    }
  }]);

  return yts;
})(_provider2.default);

module.exports = yts;