class TVDBSeries {
    constructor(data) {
        if(!data) {
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
    }
}

export default TVDBSeries;
