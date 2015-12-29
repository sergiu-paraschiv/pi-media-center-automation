import FindSeriesByName from './Handlers/FindSeriesByName';
import FindTorrent from './Handlers/FindTorrent';
import DownloadTorrent from './Handlers/DownloadTorrent';
import AddSeries from './Handlers/AddSeries';
import RemoveSeries from './Handlers/RemoveSeries';
import MySeries from './Handlers/MySeries';
import MyTorrents from './Handlers/MyTorrents';
import RemoveTorrent from './Handlers/RemoveTorrent';

class Routes {
    addTo(router) {
        router.get('/find-series-by-name', FindSeriesByName.handle);
        router.get('/find-torrent', FindTorrent.handle);
        router.post('/download-torrent', DownloadTorrent.handle);
        router.post('/remove-torrent', RemoveTorrent.handle);
        router.post('/add-series', AddSeries.handle);
        router.post('/remove-series', RemoveSeries.handle);
        router.get('/my-series', MySeries.handle);
        router.get('/my-torrents', MyTorrents.handle);
    }
}

export default new Routes();
