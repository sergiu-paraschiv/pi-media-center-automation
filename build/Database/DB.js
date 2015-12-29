'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var _Config = require('../Config');

var _Config2 = _interopRequireDefault(_Config);

var _Log = require('../Log');

var _Log2 = _interopRequireDefault(_Log);

var _Series = require('./Schemas/Series');

var _Series2 = _interopRequireDefault(_Series);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DB = (function () {
    function DB() {
        _classCallCheck(this, DB);
    }

    _createClass(DB, [{
        key: 'connect',
        value: function connect() {
            var _this = this;

            return new _promise2.default(function (resolve, reject) {
                _this.connection = _mongoose2.default.connect(_Config2.default.Database.ConnectionString).connection;
                _this.connection.on('error', function (error) {
                    _Log2.default.error(error);
                    reject(error);
                });
                _this.connection.once('open', function () {
                    var schemas = [_Series2.default];

                    schemas.forEach(function (schema) {
                        _this[schema.name] = _this.connection.model(schema.name, schema.schema);
                    });
                    resolve();
                });
            });
        }
    }]);

    return DB;
})();

exports.default = new DB();