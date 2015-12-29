'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _TorrentService = require('../../Services/TorrentService');

var _TorrentService2 = _interopRequireDefault(_TorrentService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FindTorrent = (function () {
    function FindTorrent() {
        _classCallCheck(this, FindTorrent);
    }

    _createClass(FindTorrent, [{
        key: 'handle',
        value: function handle(req, res) {
            if (req.query.query && req.query.query.length > 0) {
                _TorrentService2.default.find(req.query.query).then(function (data) {
                    res.json(data);
                });
            } else {
                res.json(null);
            }
        }
    }]);

    return FindTorrent;
})();

exports.default = new FindTorrent();