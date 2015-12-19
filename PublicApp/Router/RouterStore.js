import Store from '../Core/Store';
import {ROUTE_CHANGED} from './Events';
import {HOME} from './Routes';

class RouterStore extends Store {
    constructor() {
        super();

        this.currentRoute = HOME;
    }

    goTo(route) {
        this.currentRoute = route;
        this.notify(ROUTE_CHANGED);
    }

    getCurrentRoute() {
        return this.currentRoute;
    }
}


export default new RouterStore();
