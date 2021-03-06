'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _FindSeriesByName = require('./Handlers/FindSeriesByName');

var _FindSeriesByName2 = _interopRequireDefault(_FindSeriesByName);

var _FindTorrent = require('./Handlers/FindTorrent');

var _FindTorrent2 = _interopRequireDefault(_FindTorrent);

var _DownloadTorrent = require('./Handlers/DownloadTorrent');

var _DownloadTorrent2 = _interopRequireDefault(_DownloadTorrent);

var _AddSeries = require('./Handlers/AddSeries');

var _AddSeries2 = _interopRequireDefault(_AddSeries);

var _RemoveSeries = require('./Handlers/RemoveSeries');

var _RemoveSeries2 = _interopRequireDefault(_RemoveSeries);

var _MySeries = require('./Handlers/MySeries');

var _MySeries2 = _interopRequireDefault(_MySeries);

var _MyTorrents = require('./Handlers/MyTorrents');

var _MyTorrents2 = _interopRequireDefault(_MyTorrents);

var _RemoveTorrent = require('./Handlers/RemoveTorrent');

var _RemoveTorrent2 = _interopRequireDefault(_RemoveTorrent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Routes = (function () {
    function Routes() {
        _classCallCheck(this, Routes);
    }

    _createClass(Routes, [{
        key: 'addTo',
        value: function addTo(router) {
            router.get('/find-series-by-name', _FindSeriesByName2.default.handle);
            router.get('/find-torrent', _FindTorrent2.default.handle);
            router.post('/download-torrent', _DownloadTorrent2.default.handle);
            router.post('/remove-torrent', _RemoveTorrent2.default.handle);
            router.post('/add-series', _AddSeries2.default.handle);
            router.post('/remove-series', _RemoveSeries2.default.handle);
            router.get('/my-series', _MySeries2.default.handle);
            router.get('/my-torrents', _MyTorrents2.default.handle);
        }
    }]);

    return Routes;
})();

exports.default = new Routes();