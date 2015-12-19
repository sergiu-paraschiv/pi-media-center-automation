import Test from './Handlers/Test';
import FindSeriesByName from './Handlers/TVDB/FindSeriesByName';

class Routes {
    addTo(router) {
        router.get('/test', Test.handle);
        router.get('/find-series-by-name', FindSeriesByName.handle);
    }
}

export default new Routes();
