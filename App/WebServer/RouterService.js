import Express from 'express';
import Routes from './Routes';

class RouterService {
    initialize() {
        const router = new Express.Router();
        Routes.addTo(router);

        return router;
    }
}

export default new RouterService();
