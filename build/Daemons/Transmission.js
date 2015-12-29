'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _TransmissionService = require('../Services/TransmissionService');

var _TransmissionService2 = _interopRequireDefault(_TransmissionService);

var _DB = require('../Database/DB');

var _DB2 = _interopRequireDefault(_DB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_DB2.default.connect().then(function () {
    _TransmissionService2.default.start();
    _TransmissionService2.default.onStatus(function (status) {
        _DB2.default.Torrent.find(function (err, myTorrents) {
            if (!err) {
                _lodash2.default.each(myTorrents, function (torrent) {
                    if (torrent.status === 'new') {
                        torrent.status = 'sending-to-transmission';
                        torrent.save();
                        _TransmissionService2.default.addTorrent(torrent).then(function (data) {
                            torrent.hashString = data.hashString;
                            torrent.status = 'in-transmission';
                            torrent.save();
                        });
                    } else if (torrent.status === 'in-transmission') {
                        var torrentStatus = _lodash2.default.find(status.torrents, { hashString: torrent.hashString });
                        if (!torrentStatus) {
                            torrent.status = 'new';
                            torrent.hashString = '';
                            torrent.save();
                        } else {
                            torrent.progress = Math.round(torrentStatus.percentDone * 100 * 100) / 100;
                            if (torrentStatus.percentDone === 1) {
                                torrent.status = 'done';
                                _TransmissionService2.default.stopTorrent(torrentStatus.id);
                            }
                            torrent.save();
                        }
                    }
                });
            }
        });
    });
});