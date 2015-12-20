import DB from '../../Database/DB';

class AddSeries {
    handle(req, res) {
        let series = new DB.Series(req.body.series);
        series.save((err, series) => {
            if(err) {
                res.json({ status: false });
            }
            else {
                res.json({ status: true, data: series });
            }
        });
    }
}

export default new AddSeries();
