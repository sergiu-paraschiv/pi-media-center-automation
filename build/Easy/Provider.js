'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Provider = (function () {
    function Provider(config) {
        _classCallCheck(this, Provider);

        this.config = config;
    }

    _createClass(Provider, [{
        key: 'name',
        value: function name() {
            return this.config.name;
        }
    }, {
        key: 'find',
        value: function find(query) {
            var _this = this;

            return new _promise2.default(function (resolve, reject) {
                _superagent2.default.get(_this.config.url.replace('%query%', query)).end(function (err, res) {
                    if (err) {
                        reject();
                    } else {
                        var json = JSON.parse(res.text);
                        if (_this.config.parser) {
                            json = _this.config.parser(json);
                        }
                        resolve(json);
                    }
                });
            });
        }
    }]);

    return Provider;
})();

exports.default = Provider;