import _ from 'lodash';
import TransmissionService from '../Services/TransmissionService';
import DB from '../Database/DB';

DB.connect().then(() => {
    TransmissionService.start();
    TransmissionService.onStatus((status) => {
        DB.Torrent.find((err, myTorrents) => {
            if(!err) {
                _.each(myTorrents, (torrent) => {
                    if(torrent.status === 'new') {
                        torrent.status = 'sending-to-transmission';
                        torrent.save();
                        TransmissionService.addTorrent(torrent)
                            .then((data) => {
                                torrent.hashString = data.hashString;
                                torrent.status = 'in-transmission';
                                torrent.save();
                            });
                    }
                    else if(torrent.status === 'in-transmission') {
                        let torrentStatus = _.find(status.torrents, {hashString: torrent.hashString});
                        if(!torrentStatus) {
                            torrent.status = 'new';
                            torrent.hashString = '';
                            torrent.save();
                        }
                        else {
                            torrent.progress = Math.round(torrentStatus.percentDone * 100 * 100) / 100;
                            if(torrentStatus.percentDone === 1) {
                                torrent.status = 'done';
                                TransmissionService.stopTorrent(torrentStatus.id);
                            }
                            torrent.save();
                        }
                    }
                });
            }
        });
    });
});
