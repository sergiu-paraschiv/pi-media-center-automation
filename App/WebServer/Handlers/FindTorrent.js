import TorrentService from '../../Services/TorrentService';

class FindTorrent {
    handle(req, res) {
        if(req.query.query && req.query.query.length > 0) {
            TorrentService.find(req.query.query)
                .then((data) => {
                    res.json(data);
                });
        }
        else {
            res.json(null);
        }
    }
}

export default new FindTorrent();
