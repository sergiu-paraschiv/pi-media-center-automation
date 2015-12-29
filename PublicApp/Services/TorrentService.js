import Promise from 'promise';
import Request from 'superagent';

class TorrentService {
    find(query) {
        return new Promise((resolve, reject) => {
            Request.get('/api/v1/find-torrent')
                .query({query})
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

    download(seriesId, episodeId, torrent) {
        return new Promise((resolve, reject) => {
            Request.post('/api/v1/download-torrent')
                .send({
                    seriesId,
                    episodeId,
                    link: torrent.torrentLink,
                    title: torrent.title
                })
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

    get() {
        return new Promise((resolve, reject) => {
            Request.get('/api/v1/my-torrents')
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
            Request.post('/api/v1/remove-torrent')
                .send({
                    id
                })
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

export default new TorrentService();
