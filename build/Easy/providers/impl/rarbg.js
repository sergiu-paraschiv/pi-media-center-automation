"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rarbg = undefined;

var _provider = require("../provider.js");

var _provider2 = _interopRequireDefault(_provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var rarbg = exports.rarbg = (function (_Provider) {
  _inherits(rarbg, _Provider);

  function rarbg() {
    _classCallCheck(this, rarbg);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(rarbg).apply(this, arguments));
  }

  _createClass(rarbg, [{
    key: "processSearchResponse",
    value: function processSearchResponse(data, deferred, scope, torrentResultList) {
      //preauth needed via api
      for (var torrent in data.torrent_results) {

        var title = data.torrent_results[torrent].title;
        var torrent_link = data.torrent_results[torrent].download;
        var seeds = data.torrent_results[torrent].seeders;
        var leechs = data.torrent_results[torrent].leechers;
        var size = scope.bytesToSize(data.torrent_results[torrent].size);

        scope.buildResult(scope.getDataStructure(title, "", seeds, leechs, size, "", torrent_link, false, undefined), torrentResultList, deferred);
      }
    }
  }]);

  return rarbg;
})(_provider2.default);

module.exports = rarbg;