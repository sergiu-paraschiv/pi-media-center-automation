'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _DB = require('../../Database/DB');

var _DB2 = _interopRequireDefault(_DB);

var _IPCService = require('../../IPC/IPCService');

var _IPCService2 = _interopRequireDefault(_IPCService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddSeries = (function () {
    function AddSeries() {
        _classCallCheck(this, AddSeries);
    }

    _createClass(AddSeries, [{
        key: 'handle',
        value: function handle(req, res) {
            var series = new _DB2.default.Series(req.body.series);
            series.save(function (err, series) {
                if (err) {
                    res.json({ status: false });
                } else {
                    _IPCService2.default.message({
                        action: 'loadEpisodesForSeries',
                        params: [series.id]
                    });
                    res.json({ status: true, data: series });
                }
            });
        }
    }]);

    return AddSeries;
})();

exports.default = new AddSeries();