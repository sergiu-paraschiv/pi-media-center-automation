import FindSeriesByName from './Handlers/FindSeriesByName';
import AddSeries from './Handlers/AddSeries';
import RemoveSeries from './Handlers/RemoveSeries';
import MySeries from './Handlers/MySeries';

class Routes {
    addTo(router) {
        router.get('/find-series-by-name', FindSeriesByName.handle);
        router.post('/add-series', AddSeries.handle);
        router.post('/remove-series', RemoveSeries.handle);
        router.get('/my-series', MySeries.handle);
    }
}

export default new Routes();
