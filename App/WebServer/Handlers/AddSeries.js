import DB from '../../Database/DB';
import IPCService from '../../IPC/IPCService';

class AddSeries {
    handle(req, res) {
        let series = new DB.Series(req.body.series);
        series.save((err, series) => {
            if(err) {
                res.json({ status: false });
            }
            else {
                IPCService.message({
                    action: 'loadEpisodesForSeries',
                    params: [series.id]
                });
                res.json({ status: true, data: series });
            }
        });
    }
}

export default new AddSeries();
