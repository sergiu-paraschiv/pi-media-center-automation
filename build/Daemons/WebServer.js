'use strict';

var _DB = require('../Database/DB');

var _DB2 = _interopRequireDefault(_DB);

var _WebServerService = require('../WebServer/WebServerService');

var _WebServerService2 = _interopRequireDefault(_WebServerService);

var _RouterService = require('../WebServer/RouterService');

var _RouterService2 = _interopRequireDefault(_RouterService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_DB2.default.connect().then(function () {
    _WebServerService2.default.setRouter(_RouterService2.default.initialize());
    _WebServerService2.default.servePublic();
    _WebServerService2.default.start();
});