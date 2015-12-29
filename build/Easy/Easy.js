'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Easy = (function () {
    function Easy() {
        _classCallCheck(this, Easy);

        this.providers = [];
    }

    _createClass(Easy, [{
        key: 'addProvider',
        value: function addProvider(provider) {
            this.providers.push(provider);
        }
    }, {
        key: 'find',
        value: function find(query) {
            var _this = this;

            return new _promise2.default(function (resolve) {
                var queue = [];
                _lodash2.default.each(_this.providers, function (provider) {
                    queue.push(provider.find(query));
                });

                _promise2.default.all(queue).then(function (res) {
                    var data = [];
                    _lodash2.default.each(res, function (torrents, index) {
                        data.push({
                            name: _this.providers[index].name(),
                            torrents: torrents
                        });
                    });
                    resolve(data);
                });
            });
        }
    }]);

    return Easy;
})();

exports.default = Easy;