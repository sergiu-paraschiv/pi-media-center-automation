'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var _nodeTvdb = require('node-tvdb');

var _nodeTvdb2 = _interopRequireDefault(_nodeTvdb);

var _Config = require('../Config');

var _Config2 = _interopRequireDefault(_Config);

var _TVDBSeries = require('../Models/TVDBSeries');

var _TVDBSeries2 = _interopRequireDefault(_TVDBSeries);

var _DB = require('../Database/DB');

var _DB2 = _interopRequireDefault(_DB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TVDBService = (function () {
    function TVDBService() {
        _classCallCheck(this, TVDBService);

        this.client = new _nodeTvdb2.default(_Config2.default.TVDB.apiKey);
    }

    _createClass(TVDBService, [{
        key: 'findSeriesByName',
        value: function findSeriesByName(name) {
            var _this = this;

            return new _promise2.default(function (resolve, reject) {
                _this.client.getSeriesByName(name, function (error, res) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(_lodash2.default.map(res, function (seriesData) {
                            return new _TVDBSeries2.default(seriesData);
                        }));
                    }
                });
            });
        }
    }, {
        key: 'loadEpisodesForSeries',
        value: function loadEpisodesForSeries(id) {
            var _this2 = this;

            return new _promise2.default(function (resolve, reject) {
                _DB2.default.Series.findOne({ id: id }, function (error, series) {
                    if (error) {
                        reject(error);
                    } else {
                        _this2.client.getEpisodesById(id, function (error, episodes) {
                            if (error) {
                                reject(error);
                            } else {
                                series.episodes = episodes;
                                series.save(function (error) {
                                    if (error) {
                                        reject(error);
                                    } else {
                                        resolve(episodes);
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }
    }]);

    return TVDBService;
})();

exports.default = new TVDBService();