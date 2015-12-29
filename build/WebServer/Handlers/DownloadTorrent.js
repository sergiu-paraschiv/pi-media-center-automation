'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _DB = require('../../Database/DB');

var _DB2 = _interopRequireDefault(_DB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DownloadTorrent = (function () {
    function DownloadTorrent() {
        _classCallCheck(this, DownloadTorrent);
    }

    _createClass(DownloadTorrent, [{
        key: 'handle',
        value: function handle(req, res) {
            var torrent = new _DB2.default.Torrent({
                seriesId: req.body.seriesId,
                episodeId: req.body.episodeId,
                link: req.body.link,
                title: req.body.title,
                status: 'new',
                progress: 0
            });

            torrent.save(function (err, torrent) {
                if (err) {
                    res.json({ status: false });
                } else {
                    res.json({ status: true, data: torrent });
                }
            });
        }
    }]);

    return DownloadTorrent;
})();

exports.default = new DownloadTorrent();