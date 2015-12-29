'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var _transmission = require('transmission');

var _transmission2 = _interopRequireDefault(_transmission);

var _ScheduleService = require('../Services/ScheduleService');

var _ScheduleService2 = _interopRequireDefault(_ScheduleService);

var _Config = require('../Config');

var _Config2 = _interopRequireDefault(_Config);

var _Log = require('../Log');

var _Log2 = _interopRequireDefault(_Log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STATUS = 'status';

var TransmissionService = (function (_EventEmitter) {
    _inherits(TransmissionService, _EventEmitter);

    function TransmissionService() {
        _classCallCheck(this, TransmissionService);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TransmissionService).call(this));

        _this.client = new _transmission2.default(_Config2.default.Transmission);
        return _this;
    }

    _createClass(TransmissionService, [{
        key: 'start',
        value: function start() {
            _ScheduleService2.default.start(this.checkStatuses.bind(this), '*/2');
        }
    }, {
        key: 'onStatus',
        value: function onStatus(handler) {
            this.addListener(STATUS, handler);
        }
    }, {
        key: 'checkStatuses',
        value: function checkStatuses() {
            var _this2 = this;

            this.client.get(function (error, res) {
                if (error) {
                    _Log2.default.error(error);
                } else {
                    _this2.emit(STATUS, res);
                }
            });
        }
    }, {
        key: 'addTorrent',
        value: function addTorrent(torrent) {
            var _this3 = this;

            return new _promise2.default(function (resolve, reject) {
                _this3.client.addUrl(torrent.link, function (error, res) {
                    if (error) {
                        _Log2.default.error(error);
                        reject(error);
                    } else {
                        resolve(res);
                    }
                });
            });
        }
    }, {
        key: 'stopTorrent',
        value: function stopTorrent(id) {
            var _this4 = this;

            return new _promise2.default(function (resolve, reject) {
                _this4.client.stop([id], function (error, res) {
                    if (error) {
                        _Log2.default.error(error);
                        reject(error);
                    } else {
                        resolve(res);
                    }
                });
            });
        }
    }]);

    return TransmissionService;
})(_events2.default);

exports.default = new TransmissionService();