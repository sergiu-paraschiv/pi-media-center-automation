import Promise from 'promise';
import Request from 'superagent';

class SeriesService {
    add(series) {
        return new Promise((resolve, reject) => {
            Request.post('/api/v1/add-series')
                .send({series})
                .end((err, res) => {
                    if(err) {
                        reject();
                    }
                    else {
                        resolve(res.body);
                    }
                });
        });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            Request.post('/api/v1/remove-series')
                .send({id})
                .end((err) => {
                    if(err) {
                        reject();
                    }
                    else {
                        resolve();
                    }
                });
        });
    }

    get() {
        return new Promise((resolve, reject) => {
            Request.get('/api/v1/my-series')
                .end((err, res) => {
                    if(err) {
                        reject();
                    }
                    else {
                        resolve(res.body);
                    }
                });
        });
    }
}

export default new SeriesService();
