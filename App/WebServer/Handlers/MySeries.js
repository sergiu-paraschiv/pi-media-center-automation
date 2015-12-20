import DB from '../../Database/DB';

class MySeries {
    handle(req, res) {
        DB.Series.find((err, series) => {
            if(err) {
                res.json({ status: false });
            }
            else {
                res.json({ status: true, series });
            }
        });
    }
}

export default new MySeries();
