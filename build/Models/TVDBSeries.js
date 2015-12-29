"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TVDBSeries = function TVDBSeries(data) {
    _classCallCheck(this, TVDBSeries);

    if (!data) {
        data = {};
    }

    this.id = data.seriesid;
    this.name = data.SeriesName;
    this.banner = data.banner;
    this.overview = data.Overview;
    this.fistAired = data.FirstAired;
    this.network = data.Network;
    this.imdbId = data.IMDB_ID;
    this.episodes = data.episodes;
};

exports.default = TVDBSeries;