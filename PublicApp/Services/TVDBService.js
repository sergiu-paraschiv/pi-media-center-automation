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
                        let series = res.body;
                        let data = {
                            series: [],
                            serieNames: []
                        };

                        _.each(series, (s) => {
                            data.series.push(s);
                            data.serieNames.push(s.SeriesName);
                        });

                        resolve(data);
                    }
                });
        });
    }
}

export default new TVDBService();
