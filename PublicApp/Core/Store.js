import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

class Store extends EventEmitter {
    constructor() {
        super();
        this.setMaxListeners(0);
    }

    addChangeListener(listener) {
        this.on(CHANGE_EVENT, listener);
    }

    removeChangeListener(listener) {
        this.removeListener(CHANGE_EVENT, listener);
    }

    notify(event) {
        this.emit(CHANGE_EVENT, event);
    }
}

export default Store;
