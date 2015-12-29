import DB from '../Database/DB';
import TVDBService from '../TVDB/TVDBService';
import IPCService from '../IPC/IPCService';

DB.connect().then(() => {
    IPCService.server({
        loadEpisodesForSeries: TVDBService.loadEpisodesForSeries.bind(TVDBService)
    });
});
