import Promise from 'promise';
import TVDB from 'node-tvdb';
import Config from '../Config';

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
                    resolve(res);
                }
            });
        });
    }
}

export default new TVDBService();
