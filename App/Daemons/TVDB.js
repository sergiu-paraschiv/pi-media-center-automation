import DB from '../Database/DB';
import TVDBService from '../Services/TVDBService';
import IPCService from '../Services/IPCService';

DB.connect().then(() => {
    IPCService.server({
        loadEpisodesForSeries: TVDBService.loadEpisodesForSeries.bind(TVDBService)
    });
});
