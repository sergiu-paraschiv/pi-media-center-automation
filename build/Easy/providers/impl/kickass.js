"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.kickass = undefined;

var _provider = require('../provider.js');

var _provider2 = _interopRequireDefault(_provider);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var kickass = exports.kickass = (function (_Provider) {
    _inherits(kickass, _Provider);

    function kickass() {
        _classCallCheck(this, kickass);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(kickass).apply(this, arguments));
    }

    _createClass(kickass, [{
        key: 'processSearchResponse',
        value: function processSearchResponse(data, deferred, scope, torrentResultList) {
            if (data && data.list && data.list.length) {
                for (var torrent in data.list) {
                    var tData = data.list[torrent];
                    scope.buildResult(scope.getDataStructure(tData.title, tData.category, tData.seeds, tData.leechs, scope.bytesToSize(tData.size), "magnet:?xt=urn:btih:" + tData.hash + "&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce", tData.torrentLink, tData.verified === 1, (0, _moment2.default)(Date.parse(tData.pubDate)).fromNow()), torrentResultList, deferred);
                }
            } else {
                deferred.reject("No torrents found");
            }
        }
    }]);

    return kickass;
})(_provider2.default);

module.exports = kickass;