'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

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

exports.default = new _mongoose2.default.model('Schema', SeriesSchema);