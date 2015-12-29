import EventEmitter from 'events';
import Promise from 'promise';
import Transmission from 'transmission';
import ScheduleService from '../Services/ScheduleService';
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

    addTorrent(torrent) {
        return new Promise((resolve, reject) => {
            this.client.addUrl(torrent.link, (error, res) => {
                if(error) {
                    Log.error(error);
                    reject(error);
                }
                else {
                    resolve(res);
                }
            });
        });
    }

    stopTorrent(id) {
        return new Promise((resolve, reject) => {
            this.client.stop([id], (error, res) => {
                if(error) {
                    Log.error(error);
                    reject(error);
                }
                else {
                    resolve(res);
                }
            });
        });
    }
}

export default new TransmissionService();
