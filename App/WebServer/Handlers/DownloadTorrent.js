import DB from '../../Database/DB';

class DownloadTorrent {
    handle(req, res) {
        let torrent = new DB.Torrent({
            seriesId: req.body.seriesId,
            episodeId: req.body.episodeId,
            link: req.body.link,
            title: req.body.title,
            status: 'new',
            progress: 0
        });

        torrent.save((err, torrent) => {
            if(err) {
                res.json({ status: false });
            }
            else {
                res.json({ status: true, data: torrent });
            }
        });
    }
}

export default new DownloadTorrent();
