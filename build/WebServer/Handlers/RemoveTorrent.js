'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _DB = require('../../Database/DB');

var _DB2 = _interopRequireDefault(_DB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RemoveTorrent = (function () {
    function RemoveTorrent() {
        _classCallCheck(this, RemoveTorrent);
    }

    _createClass(RemoveTorrent, [{
        key: 'handle',
        value: function handle(req, res) {
            _DB2.default.Torrent.findByIdAndRemove(req.body.id, function (err) {
                if (err) {
                    res.json({ status: false });
                } else {
                    res.json({ status: true });
                }
            });
        }
    }]);

    return RemoveTorrent;
})();

exports.default = new RemoveTorrent();