'use strict';

var _mongoose = require('mongoose');

var _DB = require('../Database/DB');

var _DB2 = _interopRequireDefault(_DB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SeriesSchema = new _mongoose.Schema({
    id: String,
    name: String,
    banner: String,
    overview: String,
    fistAired: String,
    network: String,
    imdbId: String
});

_DB2.default.model('Series', SeriesSchema);