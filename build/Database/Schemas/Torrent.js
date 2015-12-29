'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var TorrentSchema = new _mongoose.Schema({
    seriesId: String,
    episodeId: String,
    link: String,
    status: String,
    progress: Number,
    title: String,
    hashString: String
});

exports.default = {
    name: 'Torrent',
    schema: TorrentSchema
};