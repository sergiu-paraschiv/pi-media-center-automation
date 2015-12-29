import DB from '../../Database/DB';

class RemoveTorrent {
    handle(req, res) {
        DB.Torrent.findByIdAndRemove(req.body.id, (err) => {
            if(err) {
                res.json({ status: false });
            }
            else {
                res.json({ status: true });
            }
        });
    }
}

export default new RemoveTorrent();
