import EventEmitter from 'events';
import Transmission from 'transmission';
import ScheduleService from '../Schedule/ScheduleService';
import Config from '../Config';
import Log from '../Log';

const STATUS = 'status';

class TransmissionService extends EventEmitter {
    constructor() {
        super();
        this.client = new Transmission(Config.Transmission);
    }

    start() {
        ScheduleService.start(this.checkStatuses.bind(this), '*/2');
    }

    onStatus(handler) {
        this.addListener(STATUS, handler);
    }

    checkStatuses() {
        this.client.get((error, res) => {
            if(error) {
                Log.error(error);
            }
            else {
                this.emit(STATUS, res);
            }
        });
    }
}

export default new TransmissionService();
