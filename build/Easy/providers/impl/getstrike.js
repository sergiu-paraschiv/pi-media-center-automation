"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getstrike = undefined;

var _provider = require('../provider.js');

var _provider2 = _interopRequireDefault(_provider);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getstrike = exports.getstrike = (function (_Provider) {
  _inherits(getstrike, _Provider);

  function getstrike() {
    _classCallCheck(this, getstrike);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(getstrike).apply(this, arguments));
  }

  _createClass(getstrike, [{
    key: 'processSearchResponse',
    value: function processSearchResponse(data, deferred, scope, torrentResultList) {
      if (data.results > 0) {
        for (var torrent in data.torrents) {

          var title = data.torrents[torrent].torrent_title;
          var torrent_link = data.torrents[torrent].magnet_uri;
          var seeds = data.torrents[torrent].seeds;
          var leech = data.torrents[torrent].leeches;
          var size = scope.bytesToSize(data.torrents[torrent].size);
          var date_added = (0, _moment2.default)(Date.parse(data.torrents[torrent].upload_date)).fromNow();

          scope.buildResult(scope.getDataStructure(title, "", seeds, leech, size, "", torrent_link, false, date_added), torrentResultList, deferred);
        }
      } else {
        deferred.reject("No torrents found.");
      }
    }
  }]);

  return getstrike;
})(_provider2.default);

module.exports = getstrike;