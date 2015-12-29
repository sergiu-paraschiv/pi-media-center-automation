'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _TVDBService = require('../../../TVDB/TVDBService');

var _TVDBService2 = _interopRequireDefault(_TVDBService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FindSeriesByName = (function () {
    function FindSeriesByName() {
        _classCallCheck(this, FindSeriesByName);
    }

    _createClass(FindSeriesByName, [{
        key: 'handle',
        value: function handle(req, res) {
            if (req.query.name && req.query.name.length > 0) {
                _TVDBService2.default.findSeriesByName(req.query.name).then(function (data) {
                    res.json(data);
                });
            } else {
                res.json(null);
            }
        }
    }]);

    return FindSeriesByName;
})();

exports.default = new FindSeriesByName();