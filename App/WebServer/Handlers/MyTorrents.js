import DB from '../../Database/DB';

class MyTorrents {
    handle(req, res) {
        DB.Torrent.find((err, torrents) => {
            if(err) {
                res.json({ status: false });
            }
            else {
                res.json({ status: true, torrents });
            }
        });
    }
}

export default new MyTorrents();
