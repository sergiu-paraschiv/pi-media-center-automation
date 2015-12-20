import TVDBService from '../../TVDB/TVDBService';

class FindSeriesByName {
    handle(req, res) {
        if(req.query.name && req.query.name.length > 0) {
            TVDBService.findSeriesByName(req.query.name)
                .then((data) => {
                    res.json(data);
                });
        }
        else {
            res.json(null);
        }
    }
}

export default new FindSeriesByName();
