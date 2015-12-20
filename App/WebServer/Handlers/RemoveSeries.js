import DB from '../../Database/DB';

class RemoveSeries {
    handle(req, res) {
        DB.Series.remove({id: req.body.id}, (err) => {
            if(err) {
                res.json({ status: false });
            }
            else {
                res.json({ status: true });
            }
        });
    }
}

export default new RemoveSeries();
