"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eztv = undefined;

var _provider = require("../provider.js");

var _provider2 = _interopRequireDefault(_provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var eztv = exports.eztv = (function (_Provider) {
  _inherits(eztv, _Provider);

  function eztv() {
    _classCallCheck(this, eztv);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(eztv).apply(this, arguments));
  }

  _createClass(eztv, [{
    key: "processSearchResponse",
    value: function processSearchResponse($, deferred, scope, torrentResultList) {
      if ($("tr.forum_header_border").length > 0) {
        $("tr.forum_header_border").each(function (index, torrent) {
          var eztv_link = $(torrent).find("a.magnet").attr('href');
          var torrent_title = $(torrent).find("a.epinfo").text();
          var torrent_size = $(torrent).find("a.epinfo").attr("title").match(/\([^)]+\)$/)[0].slice(1, -1);
          var torrent_seeds = $(torrent).find(".seed").text();
          var torrent_leech = $(torrent).find(".leech").text();
          var date_added = $("td.forum_thread_post_end", torrent).prev().text();

          scope.buildResult(scope.getDataStructure(torrent_title, "", torrent_seeds, torrent_leech, torrent_size, eztv_link, "", false, date_added), torrentResultList, deferred);
        });
      } else {
        deferred.reject("No torrents found");
      }
    }
  }]);

  return eztv;
})(_provider2.default);

module.exports = eztv;