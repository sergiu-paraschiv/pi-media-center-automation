'use strict';

var _DB = require('../Database/DB');

var _DB2 = _interopRequireDefault(_DB);

var _TVDBService = require('../TVDB/TVDBService');

var _TVDBService2 = _interopRequireDefault(_TVDBService);

var _IPCService = require('../IPC/IPCService');

var _IPCService2 = _interopRequireDefault(_IPCService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_DB2.default.connect().then(function () {
    _IPCService2.default.server({
        loadEpisodesForSeries: _TVDBService2.default.loadEpisodesForSeries.bind(_TVDBService2.default)
    });
});