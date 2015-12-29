import _ from 'lodash';
import Promise from 'promise';
import TVDB from 'node-tvdb';
import Config from '../Config';
import TVDBSeries from '../Models/TVDBSeries';
import DB from '../Database/DB';

class TVDBService {
    constructor() {
        this.client = new TVDB(Config.TVDB.apiKey);
    }

    findSeriesByName(name) {
        return new Promise((resolve, reject) => {
            this.client.getSeriesByName(name, (error, res) => {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(_.map(res, (seriesData) => new TVDBSeries(seriesData)));
                }
            });
        });
    }

    loadEpisodesForSeries(id) {
        return new Promise((resolve, reject) => {
            DB.Series.findOne({id}, (error, series) => {
                if(error) {
                    reject(error);
                }
                else {
                    this.client.getEpisodesById(id, (error, episodes) => {
                        if(error) {
                            reject(error);
                        }
                        else {
                            series.episodes = episodes;
                            series.save((error) => {
                                if(error) {
                                    reject(error);
                                }
                                else {
                                    resolve(episodes);
                                }
                            });
                        }
                    });
                }
            });
        });
    }
}

export default new TVDBService();
