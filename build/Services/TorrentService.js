'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Easy = require('../Easy/Easy');

var _Easy2 = _interopRequireDefault(_Easy);

var _Kickass = require('../Easy/Providers/Kickass');

var _Kickass2 = _interopRequireDefault(_Kickass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TorrentService = (function () {
    function TorrentService() {
        _classCallCheck(this, TorrentService);

        this.client = new _Easy2.default();
        this.client.addProvider(new _Kickass2.default());
    }

    _createClass(TorrentService, [{
        key: 'find',
        value: function find(query) {
            return this.client.find(query);
        }
    }]);

    return TorrentService;
})();

exports.default = new TorrentService();