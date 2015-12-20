import _ from 'lodash';
import Promise from 'promise';
import Request from 'superagent';

class TVDBService {
    findSeriesByName(name) {
        return new Promise((resolve, reject) => {
            Request.get('/api/v1/find-series-by-name')
                .query({name})
                .end((err, res) => {
                    if(err) {
                        reject();
                    }
                    else {
                        let seriesList = res.body;
                        let data = {
                            series: [],
                            serieNames: []
                        };

                        _.each(seriesList, (series) => {
                            data.series.push(series);
                            data.serieNames.push(series.name);
                        });

                        resolve(data);
                    }
                });
        });
    }
}

export default new TVDBService();
