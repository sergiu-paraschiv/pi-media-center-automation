'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _Config = require('../Config');

var _Config2 = _interopRequireDefault(_Config);

var _IPCService = require('../Services/IPCService');

var _IPCService2 = _interopRequireDefault(_IPCService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebServerService = (function () {
    function WebServerService() {
        _classCallCheck(this, WebServerService);

        this.server = new _express2.default();
        this.server.use(_bodyParser2.default.urlencoded({ extended: true }));
        this.server.use(_bodyParser2.default.json());
    }

    _createClass(WebServerService, [{
        key: 'setRouter',
        value: function setRouter(router) {
            this.server.use(_Config2.default.WebServer.apiUri, router);
        }
    }, {
        key: 'servePublic',
        value: function servePublic() {
            this.server.use(_express2.default.static(_Config2.default.WebServer.publicPath));
        }
    }, {
        key: 'start',
        value: function start() {
            _IPCService2.default.client();
            this.server.listen(_Config2.default.WebServer.port, _Config2.default.WebServer.host);
        }
    }]);

    return WebServerService;
})();

exports.default = new WebServerService();