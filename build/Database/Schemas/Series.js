'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var SeriesSchema = new _mongoose.Schema({
    id: String,
    name: String,
    banner: String,
    overview: String,
    fistAired: String,
    network: String,
    imdbId: String,
    episodes: Array
});

exports.default = {
    name: 'Series',
    schema: SeriesSchema
};