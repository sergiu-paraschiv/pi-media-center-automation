'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dnode = require('dnode');

var _dnode2 = _interopRequireDefault(_dnode);

var _Config = require('../Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IPCService = (function () {
    function IPCService() {
        _classCallCheck(this, IPCService);
    }

    _createClass(IPCService, [{
        key: 'server',
        value: function server(handlers) {
            var _this = this;

            this.server = (0, _dnode2.default)({
                message: function message(data, callback) {
                    if (handlers[data.action]) {
                        handlers[data.action].apply(_this, data.params).then(function (response) {
                            return callback(response);
                        });
                    }
                }
            });

            this.server.listen(_Config2.default.IPC.port);
        }
    }, {
        key: 'client',
        value: function client() {
            var _this2 = this;

            this.client = _dnode2.default.connect(_Config2.default.IPC.port);
            this.client.on('remote', function (remote) {
                _this2.remote = remote;
            });
        }
    }, {
        key: 'message',
        value: function message(data) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                if (_this3.remote) {
                    _this3.remote.message(data, function (response) {
                        resolve(response);
                    });
                } else {
                    reject();
                }
            });
        }
    }]);

    return IPCService;
})();

exports.default = new IPCService();